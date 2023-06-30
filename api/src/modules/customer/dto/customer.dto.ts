import { Contact, Product } from '@prisma/client'
import CustomerEntity from '../entities/customer.entity';

export interface PaginationFilterDTO {
  perPage?: number;
  page?: number;
  q?: string;
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
  comissionTerm?: Date
  percentageComissions?: number
  products?: Pick<Product, 'name' | 'shortName'>[]
  contacts?: Pick<Contact, 'name' | 'email' | 'type'>[]
}

export type PublicCustomerDTO = CustomerEntity;

export type PublicCustomersDTO = {
  total: number
  page: number
  perPage: number
  data: PublicCustomerDTO[]
};
