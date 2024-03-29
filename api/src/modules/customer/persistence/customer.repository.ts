import prismaClient from '../../common/persistence/prisma-client'
import { Prisma } from '@prisma/client'

import Option from '../../common/types/Option.type'
import {
  // CreateCustomerDTO,
  UpdateCustomerDTO, PublicCustomerDTO, PaginationFilterDTO, PublicCustomersDTO, PublicProductsDTO, ListCustomersDTO
} from '../dto/customer.dto'
import ICustomerRepository from '../service/ICustomerRepository'

export default class CustomerRepository implements ICustomerRepository {
  // async createCustomer({ name, email, password, roles }: CreateCustomerDTO): Promise<PublicCustomerDTO> {
  //   const createdCustomer = await prismaClient.customer.create({
  //     data: {
  //       name,
  //       email,
  //       password: hashSync(password, 8),
  //       roles: {
  //         connect: roles
  //       }
  //     },
  //     include: {
  //       roles: {
  //         select: {
  //           name: true,
  //           permissions: {
  //             select: {
  //               action: true
  //             }
  //           }
  //         }
  //       }
  //     }
  //   })

  //   return {
  //     id: createdCustomer.id,
  //     name: createdCustomer.name,
  //     email: createdCustomer.email,
  //     roles: createdCustomer.roles,
  //   }
  // }

  async getCustomer (id: string): Promise<Option<PublicCustomerDTO>> {
    const foundCustomer = await prismaClient.customer.findUnique({
      where: { id },
      include: {
        products: {
          select: {
            name: true,
            shortName: true,
          }
        },
        contacts: {
          select: {
            name: true,
            email: true,
            type: true,
          }
        },
      }
    })

    if (!foundCustomer) return

    // const { name, email, roles } = foundCustomer

    return foundCustomer
  }

  async updateCustomer (id: string, customer: UpdateCustomerDTO): Promise<Option<PublicCustomerDTO>> {
    const {
      customId,
      name,
      email,
      country,
      registeredName,
      rfc,
      address,
      economicActivity,
      status,
      sellerComments,
      comissionTerm,
      percentageComissions,
      products,
      devices,
      skuStart,
      skuEnd,
      sku3m,
      skuHBMF,
      skuHBMPRE,
      dbName
    } = customer
    const updatedCustomer = await prismaClient.customer.update({
      where: {
        id
      },
      data: {
        customId,
        name,
        email,
        country,
        registeredName,
        rfc,
        address,
        economicActivity,
        status,
        sellerComments,
        comissionTerm,
        percentageComissions,
        products: {
          set: [],
          connect: products
        },
        devices,
        skuStart,
        skuEnd,
        sku3m,
        skuHBMF,
        skuHBMPRE,
        dbName
      },
      include: {
        products: {
          select: {
            name: true,
            shortName: true,
          }
        },
        contacts: {
          select: {
            name: true,
            email: true,
            type: true,
          }
        },
      }
    })

    return updatedCustomer
  }

  async deleteCustomer (id: string): Promise<PublicCustomerDTO> {
    const deletedCustomer = await prismaClient.customer.delete({
      where: {
        id
      },
      include: {
        products: {
          select: {
            name: true,
            shortName: true,
          }
        },
        contacts: {
          select: {
            name: true,
            email: true,
            type: true,
          }
        },
      }
    })

    return deletedCustomer
  }

  async listCustomers ({ perPage = 10, page = 0, q: searchText = '', pagination = true, fields = [], hasProducts = [] }: ListCustomersDTO): Promise<Option<PublicCustomersDTO>> {
    const where: Prisma.CustomerWhereInput = {
      OR: [
        {
          customId: {
            contains: searchText,
            mode: 'insensitive'
          }
        },
        {
          name: {
            contains: searchText,
            mode: 'insensitive'
          }
        },
        {
          email: {
            contains: searchText,
            mode: 'insensitive'
          }
        },
        {
          status: {
            contains: searchText,
            mode: 'insensitive'
          }
        },
      ],
      // products: hasProducts.length > 0
      //   ? {
      //     some: {
      //       shortName: {
      //         in: hasProducts
      //       }
      //     }
      //   }
      //   : undefined
      AND:
        hasProducts?.map(product => {
          return {
            products: {
              some: {
                shortName: product
              }
            }
          }
        }) ?? []
      // {
      //   products: {
      //     some: {
      //       shortName: hasProducts[0]
      //     }
      //   }
      // },
      // {
      //   products: {
      //     some: {
      //       shortName: hasProducts[1]
      //     }
      //   }
      // }

    }

    const customersQuery = prismaClient.customer.findMany({
      skip: pagination ? perPage * page : undefined,
      take: pagination ? perPage : undefined,

      where,

      orderBy: {
        name: 'asc'
      },

      select: {
        id: true,
        customId: true,
        name: true,
        email: true,
        country: true,
        registeredName: true,
        rfc: true,
        address: true,
        economicActivity: true,
        status: true,
        sellerName: true,
        sellerComments: true,
        comissionTerm: true,
        percentageComissions: true,
        devices: true,
        skuStart: true,
        skuEnd: true,
        products: {
          select: {
            name: true,
            shortName: true,
          }
        },
        contacts: {
          select: {
            name: true,
            email: true,
            type: true,
          }
        },
      },
    })

    if (pagination) {
      const countQuery = prismaClient.customer.count({ where })

      const [
        customers,
        total
      ] = await prismaClient.$transaction([
        customersQuery,
        countQuery
      ])

      const data = fields.length > 0
        ? customers.map((customer: any) => {
          return Object.keys(customer).reduce((object: any, key: string) => {
            if (fields.includes(key)) {
              object[key] = customer[key];
            }
            return object;
          }, {})
        })
        : customers

      return { total, page, perPage, data }
    }

    const [customers] = await prismaClient.$transaction([customersQuery])

    const data = fields.length > 0
      ? customers.map((customer: any) => {
        return Object.keys(customer).reduce((object: any, key: string) => {
          if (fields.includes(key)) {
            object[key] = customer[key];
          }
          return object;
        }, {})
      })
      : customers

    return { data }
  }

  async listProducts ({ perPage = 10, page = 0, q: searchText = '' }: PaginationFilterDTO): Promise<Option<PublicProductsDTO>> {
    const where: Prisma.ProductWhereInput = {
      OR: [
        {
          name: {
            contains: searchText,
            mode: 'insensitive'
          }
        },
        {
          shortName: {
            contains: searchText,
            mode: 'insensitive'
          }
        },
      ],
    }

    const productsQuery = prismaClient.product.findMany({
      skip: Number(perPage) * Number(page),
      take: Number(perPage),

      where,

      orderBy: {
        name: 'asc'
      },
    })

    const [products, productsCount] = await prismaClient.$transaction([
      productsQuery,
      prismaClient.product.count({ where }),
    ])

    return {
      total: productsCount,
      page: Number(page),
      perPage: Number(perPage),
      data: products
    }
  }
}
