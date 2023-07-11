import { coerce, object, optional, string, TypeOf, z } from 'zod'

const ISO_DATE_REGEX = /^\d{4}-[01]\d-[0-3]\d$|^$/

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
    comissionTerm: string().regex(ISO_DATE_REGEX, 'La fecha debe estar en formato yyyy-MM-dd'),
    percentageComissions: z.coerce.number()
      .gte(0, 'El porcentaje de comisión debe ser mayor o igual a 0')
      .lte(100, 'El porcentaje de comisión debe ser menor o igual a 100'),
    products: object({
      shortName: string({ required_error: 'Product short name is required' }),
    }).array(),
    contacts: object({
      type: string({ required_error: 'Contact type is required' }),
      name: string({ required_error: 'Contact name is required' }),
      email: string({ required_error: 'Contact email is required' }),
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
