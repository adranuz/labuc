export interface CreditReports {
  total: number
  page: number
  perPage: number
  data: CreditReport[]
}

export interface CreditReport {
  creditId: number
  branch: string
  model: string
  imei: string
  saleDate: Date
  creditStatus: string
}
