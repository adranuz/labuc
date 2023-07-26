"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = __importDefault(require("../../common/persistence/prisma-client"));
class CustomerRepository {
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
    async getCustomer(id) {
        const foundCustomer = await prisma_client_1.default.customer.findUnique({
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
        });
        if (!foundCustomer)
            return;
        // const { name, email, roles } = foundCustomer
        return foundCustomer;
    }
    async updateCustomer(id, customer) {
        const { customId, name, email, country, registeredName, rfc, address, economicActivity, status, sellerComments, comissionTerm, percentageComissions, products, devices, skuStart, skuEnd, sku3m, skuHBMF, skuHBMPRE, } = customer;
        const updatedCustomer = await prisma_client_1.default.customer.update({
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
        });
        return updatedCustomer;
    }
    async deleteCustomer(id) {
        const deletedCustomer = await prisma_client_1.default.customer.delete({
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
        });
        return deletedCustomer;
    }
    async listCustomers({ perPage = 10, page = 0, q: searchText = '' }) {
        const where = {
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
        };
        const customersQuery = prisma_client_1.default.customer.findMany({
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
        });
        const [customers, customersCount] = await prisma_client_1.default.$transaction([
            customersQuery,
            prisma_client_1.default.customer.count({ where }),
        ]);
        return {
            total: customersCount,
            page: Number(page),
            perPage: Number(perPage),
            data: customers
        };
    }
    async listProducts({ perPage = 10, page = 0, q: searchText = '' }) {
        const where = {
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
        };
        const productsQuery = prisma_client_1.default.product.findMany({
            skip: Number(perPage) * Number(page),
            take: Number(perPage),
            where,
            orderBy: {
                name: 'asc'
            },
        });
        const [products, productsCount] = await prisma_client_1.default.$transaction([
            productsQuery,
            prisma_client_1.default.product.count({ where }),
        ]);
        return {
            total: productsCount,
            page: Number(page),
            perPage: Number(perPage),
            data: products
        };
    }
}
exports.default = CustomerRepository;
