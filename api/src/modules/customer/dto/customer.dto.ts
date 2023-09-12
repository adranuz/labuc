import { Contact, Product } from '@prisma/client'
import CustomerEntity from '../entities/customer.entity';
import { Customer } from '@prisma/client'

export interface PaginationFilterDTO {
  perPage?: number;
  page?: number;
  q?: string;
  pagination?: boolean;
}

export interface PaginationFilterResponseDTO {
  total?: number
  page?: number
  perPage?: number
}

// export interface CreateCustomerDTO {
//   email: string;
//   name: string;
//   password: string;
//   roles: Pick<Role, 'name'>[];
// }

export interface UpdateCustomerDTO {
  customId?: string
  name?: string
  email?: string
  country?: string
  registeredName?: string
  rfc?: string
  address?: string
  economicActivity?: string
  status?: string
  sellerName?: string
  sellerComments?: string
  comissionTerm?: string
  percentageComissions?: number
  products?: Pick<Product, 'shortName'>[]
  contacts?: Pick<Contact, 'name' | 'email' | 'type'>[]
  devices?: string[]
  skuStart?: string
  skuEnd?: string
  sku3m?: boolean
  skuHBMF?: boolean
  skuHBMPRE?: boolean
  dbName?: string
}

export interface ListCustomersDTO extends PaginationFilterDTO {
  fields?: string[]
  hasProducts?: string[]
}

export type PublicCustomerDTO = CustomerEntity;

export interface PublicCustomersDTO extends PaginationFilterResponseDTO {
  data: Partial<Customer>[]
}

export type PublicProductsDTO = {
  total: number
  page: number
  perPage: number
  data: any[]
};
