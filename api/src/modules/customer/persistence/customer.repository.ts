import prismaClient from '../../common/persistence/prisma-client'
import { Prisma } from '@prisma/client'

import Option from '../../common/types/Option.type'
import { 
  // CreateCustomerDTO,
  UpdateCustomerDTO, PublicCustomerDTO, PaginationFilterDTO, PublicCustomersDTO
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

  async getCustomer(id: string): Promise<Option<PublicCustomerDTO>> {
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

  async updateCustomer(id: string, customer: UpdateCustomerDTO): Promise<Option<PublicCustomerDTO>> {
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

  async deleteCustomer(id: string): Promise<PublicCustomerDTO> {
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

  async listCustomers({perPage = 10, page = 0, q: searchText = ''}: PaginationFilterDTO ): Promise<Option<PublicCustomersDTO>> {
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
    }
    
    const customersQuery = prismaClient.customer.findMany({
      skip: Number(perPage) * Number(page),
      take: Number(perPage),

      where,

      orderBy: {
        createdAt: 'asc'
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

    const [customers, customersCount] = await prismaClient.$transaction([
      customersQuery,
      prismaClient.customer.count({ where }),
    ])

    return {
      total: customersCount,
      page: Number(page),
      perPage: Number(perPage),
      data: customers
    }
  }
}
