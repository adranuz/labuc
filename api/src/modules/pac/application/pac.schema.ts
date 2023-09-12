import { coerce, object, string, nativeEnum, enum as zEnum, TypeOf } from 'zod'

const params = {
  params: object({
    id: string().uuid()
  }),
}

const pagination = object({
  perPage: coerce.number().positive(),
  page: coerce.number().nonnegative(),
  q: string(),
  pagination: zEnum(['true', 'false']).transform((value) => value === 'true')
})

export const getPacCustomerCreditStatsSchema = object({
  ...params
})

enum creditStatus {
  // SOLIC = "SOLIC",
  PEND = "PEND",
  CANC = "CANC",
  MORA = "MORA",
  // REFIN = "REFIN",
  // HOLD = "HOLD",
  ANUL = "ANUL",
  // HDAL = "HDAL",
  // DEFI = "DEFI"
}

enum scoreStatus {
  accepted = "accepted",
  notAccepted = "notAccepted"
}

export const getPacCustomerCreditReportSchema = object({
  ...params,
  query: pagination.merge(
    object({
      status: nativeEnum(creditStatus),
      startDate: string(),
      endDate: string()
    })
  ).partial().refine(
    data => (data.startDate || data.endDate) ? (data.startDate && data.endDate) : true,
    'The start date and end date are required.',
  )
})

export const getPacCustomerCreditReportFileSchema = object({
  ...params,
  query: object({
    status: nativeEnum(creditStatus),
    startDate: string(),
    endDate: string()
  }).partial().refine(
    data => (data.startDate || data.endDate) ? (data.startDate && data.endDate) : true,
    'The start date and end date are required.',
  )
})

export const getPacCustomerScoreReportSchema = object({
  ...params,
  query: pagination.merge(
    object({
      status: nativeEnum(scoreStatus),
      startDate: string(),
      endDate: string()
    })
  ).partial().refine(
    data => (data.startDate || data.endDate) ? (data.startDate && data.endDate) : true,
    'The start date and end date are required.',
  )
})

export const getPacCustomerScoreReportFileSchema = object({
  ...params,
  query: object({
    status: nativeEnum(scoreStatus),
    startDate: string(),
    endDate: string()
  }).partial().refine(
    data => (data.startDate || data.endDate) ? (data.startDate && data.endDate) : true,
    'The start date and end date are required.',
  )
})

export type GetPacCustomerCreditStatsInput = TypeOf<typeof getPacCustomerCreditStatsSchema>['params']
export type GetPacCustomerCreditReportInput = TypeOf<typeof getPacCustomerCreditReportSchema>
export type GetPacCustomerCreditReportFileInput = TypeOf<typeof getPacCustomerCreditReportFileSchema>
export type GetPacCustomerScoreReportInput = TypeOf<typeof getPacCustomerScoreReportSchema>
export type GetPacCustomerScoreReportFileInput = TypeOf<typeof getPacCustomerScoreReportFileSchema>
