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
    reportedAt: string({ required_error: 'Reported at is required' }),
  }),
  files: z.any().array().min(1, { message: 'Se requiere al menos un archivo' }),
})

export const listBlockingReportSchema = object({
  query: pagination.merge(
    object({
      fields: optional(z.enum(['id', 'reportedAt']).array()),
      includeConsolidated: optional(z.enum(['true', 'false']).transform((value) => value === 'true'))
    })
  )
})

export const getBlockingDeviceSchema = object({
  ...params,
})

export const getBlockingDeviceImportLogSchema = object({
  ...params,
  query: object({
    type: string()
  })
})

export const getBlockingDeviceConsolidatedReportSchema = object({
  ...params,
  query: object({
    deviceType: optional(string({ required_error: 'Device type is required' }))
  })
})

export const getCustomerReportSchema = object({
  params: object({
    id: string().uuid(),
    name: string(),
  }),
  query: object({
    deviceType: optional(string({ required_error: 'Device type is required' }))
  })
})

export const createConsolidatedSchema = object({
  ...params,
})

export type PaginationInput = TypeOf<typeof paginationFilterSchema>['query']

export type CreateBlockingReportInput = TypeOf<typeof createBlockingReportSchema>
export type ListBlockingReportInput = TypeOf<typeof listBlockingReportSchema>['query']
export type GetBlockingDeviceInput = TypeOf<typeof getBlockingDeviceSchema>['params']
export type GetBlockingDeviceImportLogInput = TypeOf<typeof getBlockingDeviceImportLogSchema>

export type GetCustomerReportInput = TypeOf<typeof getCustomerReportSchema>
export type GetBlockingDeviceConsolidatedReportInput = TypeOf<typeof getBlockingDeviceConsolidatedReportSchema>
export type CreateConsolidatedInput = TypeOf<typeof createConsolidatedSchema>['params']