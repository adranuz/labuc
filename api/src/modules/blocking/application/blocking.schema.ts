import { object, string, z, TypeOf } from 'zod'

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

export type ImportBlockingInput = TypeOf<typeof importBlockingSchema>
export type GetCustomerReportInput = TypeOf<typeof getCustomerReportSchema>['query']