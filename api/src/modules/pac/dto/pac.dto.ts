export interface PaginationFilterDTO {
  perPage?: number;
  page?: number;
  q?: string;
  pagination?: boolean;
}

export interface PaginationFilterResponseDTO {
  total: number
  page: number
  perPage: number
}

export interface getPacCustomerCreditStatsDTO {
  id: string
}

export interface getPacCustomerCreditStatsResponseDTO {
  generalCount?: number
  statusAnulCount?: number
  statusCancCount?: number
  statusDefiCount?: number
  statusMoraCount?: number
  statusPendCount?: number
  successScore?: number
  errorScore: number
  createdAt?: Date
}

export interface getPacCustomerCreditReportDTO extends PaginationFilterDTO {
  id: string
  status?: string
  startDate?: string
  endDate?: string
}

export interface getPacCustomerCreditReportFileDTO {
  id: string
  status?: string
  startDate?: string
  endDate?: string
}

export interface CustomerCreditReport {
  creditId: number
  branch: string
  model: string
  imei: string
  saleDate: Date
  creditStatus: string
}

export interface getPacCustomerCreditReportResponseDTO extends PaginationFilterResponseDTO {
  data: CustomerCreditReport[]
}

export interface getPacCustomerScoreReportDTO extends PaginationFilterDTO {
  id: string
  status?: string
  startDate?: string
  endDate?: string
}

export interface CustomerScoreReport {
  creditId: number
  reference: string
  requestId: number
  requestDate: Date
  status: boolean
  score: number
  previouslyValidatedDevice: boolean
}

export interface getPacCustomerScoreReportResponseDTO extends PaginationFilterResponseDTO {
  data: CustomerScoreReport[]
}