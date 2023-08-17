export interface NuovoReports {
  total: number
  page: number
  perPage: number
  data: NuovoReport[]
}

export interface NuovoReport {
  id: string
  reportedAt: Date
  logProcess: LogProcess[]
  logFile: LogFile[]
  isConsolidated: boolean
  isLatest: boolean
}

export interface LogFile {
  size: number
}

export interface LogProcess {
  createdAt: Date
  finishedAt: Date
}
