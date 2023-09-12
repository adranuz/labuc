export interface BlockingDevices {
  total: number
  page: number
  perPage: number
  data: BlockingDevice[]
}

export interface BlockingDevice {
  id: string
  reportedAt: Date
  logProcess: LogProcess[]
  logFile: LogFile[]
  isConsolidated: boolean
  isLatestImported: boolean
}

export interface LogFile {
  size: number
}

export interface LogProcess {
  createdAt: Date
  finishedAt: Date
}
