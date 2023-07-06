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

export const getActivationReportSchema = object({
  query: object({
    deviceType: optional(string({ required_error: 'Device type is required' }))
  })
})

export const getCustomerReportSchema = object({
  query: object({
    deviceType: optional(string({ required_error: 'Device type is required' })),
    name: string({ required_error: 'Name is required' })
  })
})

export type PaginationInput = TypeOf<typeof paginationFilterSchema>['query']

export type ImportBlockingInput = TypeOf<typeof importBlockingSchema>
export type GetCustomerReportInput = TypeOf<typeof getCustomerReportSchema>['query']
export type GetActivationReportInput = TypeOf<typeof getActivationReportSchema>['query']