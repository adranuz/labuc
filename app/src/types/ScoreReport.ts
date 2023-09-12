export interface ScoreReports {
  total: number
  page: number
  perPage: number
  data: ScoreReport[]
}

export interface ScoreReport {
  creditId: number
  reference: string
  requestId: number
  requestDate: Date
  status: string
  score: number
  previouslyValidatedDevice: String
  deviceId: String
}
