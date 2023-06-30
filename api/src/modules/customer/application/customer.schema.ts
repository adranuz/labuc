import { coerce, object, optional, string, TypeOf, z } from 'zod'

const params = {
  params: object({
    id: string().uuid(),
  }),
}

export const paginationFilterSchema = object({
  query: object({
    perPage: optional(coerce.number().positive()),
    page: optional(coerce.number().nonnegative()),
    q: optional(string()),
  })
})

// export const createCustomerSchema = object({
//   body: object({
//     name: string({ required_error: 'Name is required' }),
//     email: string({ required_error: 'Email is required' }).email('Email is invalid'),
//     password: string({ required_error: 'Password is required' })
//       .min(8, 'Password must be more than 8 characters'),
//     roles: object({
//       name: string({ required_error: 'Role name is required' })
//     }).array(),
//   })
// })

export const getCustomerSchema = object({
  ...params,
})

export const updateCustomerSchema = object({
  ...params,
  body: object({
    customId: string(),
    name: string(),
    email: string(),
    country: string(),
    registeredName: string(),
    rfc: string(),
    address: string(),
    economicActivity: string(),
    status: string(),
    sellerComments: string(),
    comissionTerm: z.date(),
    percentageComissions: z.number(),
    products: object({
      name: string({ required_error: 'Product name is required' }),
      shortName: string({ required_error: 'Product short name is required' }),
    }).array(),
    contacts: object({
      name: string({ required_error: 'Contact name is required' }),
      email: string({ required_error: 'Contact email is required' }),
      type: string({ required_error: 'Contact type is required' }),
    }).array(),
  }).partial()
})

export const deleteCustomerSchema = object({
  ...params,
})

export type PaginationInput = TypeOf<typeof paginationFilterSchema>['query']

// export type CreateCustomerInput = TypeOf<typeof createCustomerSchema>['body']
export type GetCustomerInput = TypeOf<typeof getCustomerSchema>['params']
export type UpdateCustomerInput = TypeOf<typeof updateCustomerSchema>
export type DeleteCustomerInput = TypeOf<typeof deleteCustomerSchema>['params'];
