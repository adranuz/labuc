import { coerce, object, optional, string, TypeOf, z } from 'zod'

export const paginationFilterSchema = object({
  query: object({
    perPage: optional(coerce.number().positive()),
    page: optional(coerce.number().nonnegative()),
    q: optional(string()),
  })
})

export const importBlockingSchema = object({
  body: object({
    truncate: string({ required_error: 'Truncate is required' })
  }),
  files: z.any().array().min(1, { message: 'Se requiere al menos un archivo' }),
})

export const getCustomerReportSchema = object({
  query: object({
    name: string({ required_error: 'Name is required' })
  })
})

export type PaginationInput = TypeOf<typeof paginationFilterSchema>['query']

export type ImportBlockingInput = TypeOf<typeof importBlockingSchema>
export type GetCustomerReportInput = TypeOf<typeof getCustomerReportSchema>['query']