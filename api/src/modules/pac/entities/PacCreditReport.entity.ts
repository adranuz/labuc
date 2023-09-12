export default interface PacCreditReport {
  id: number
  client: string
  general_count: number
  status_count: StatusCount
  success_score: number
  error_score: number
  created_at: Date
}

export interface StatusCount {
  ANUL?: number
  CANC?: number
  DEFI?: number
  MORA?: number
  PEND?: number
}