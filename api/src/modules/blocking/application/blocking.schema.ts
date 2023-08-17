import { coerce, object, optional, string, TypeOf, z } from 'zod'

const params = {
  params: object({
    id: string().uuid(),
  }),
}

const pagination = object({
  perPage: optional(coerce.number().positive()),
  page: optional(coerce.number().nonnegative()),
  q: optional(string()),
  pagination: optional(z.enum(['true', 'false']).transform((value) => value === 'true')),
})

export const paginationFilterSchema = object({
  query: pagination,
})

export const createBlockingReportSchema = object({
  body: object({
    truncate: string({ required_error: 'Truncate is required' }),
    reportedAt: string({ required_error: 'Reported at is required' }),
  }),
  files: z.any().array().min(1, { message: 'Se requiere al menos un archivo' }),
})

export const listBlockingReportSchema = object({
  query: pagination.merge(
    object({
      fields: optional(z.enum(['id', 'reportedAt']).array()),
      consolidated: optional(z.enum(['true', 'false']).transform((value) => value === 'true'))
    })
  )
})

export const getNuovoReportSchema = object({
  ...params,
})

export const getNuovoReportLogSchema = object({
  ...params,
  query: object({
    type: string()
  })
})

export const getNuovoReportConsolidatedSchema = object({
  ...params,
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

export const createConsolidatedSchema = object({
  ...params,
})

export type PaginationInput = TypeOf<typeof paginationFilterSchema>['query']

export type CreateBlockingReportInput = TypeOf<typeof createBlockingReportSchema>
export type ListBlockingReportInput = TypeOf<typeof listBlockingReportSchema>['query']
export type GetNuovoReportInput = TypeOf<typeof getNuovoReportSchema>['params']
export type GetNuovoReportLogInput = TypeOf<typeof getNuovoReportLogSchema>


export type GetCustomerReportInput = TypeOf<typeof getCustomerReportSchema>['query']
export type GetNuovoReportConsolidatedInput = TypeOf<typeof getNuovoReportConsolidatedSchema>
export type CreateConsolidatedInput = TypeOf<typeof createConsolidatedSchema>['params']