export const getDifferenceInSeconds = (from: string, to: string) => {
  if (to === null) return 0

  const fromDate = new Date(from)
  const toDate = new Date(to)

  return (toDate.getTime() - fromDate.getTime()) / 1000
}

export const getTotalFilesSize = (files) => {
  return files.map(file => file.size).reduce((accumulator: number, current: number) => accumulator + current, 0)
}

export const getTotalProcessingTime = (logProcess) => {
  return logProcess.map(status => getDifferenceInSeconds(status.createdAt, status.finishedAt)).reduce((accumulator: number, current: number) => accumulator + current, 0)
}

export const localeDate = ({ date, withTime = true }) => {
  return new Date(date).toLocaleString(
    'es',
    withTime
      ? {
        dateStyle: 'medium',
        timeStyle: 'short',
        hour12: true
      }
      : {
        timeZone: 'UTC',
        dateStyle: 'medium'
      }
  )
}

export const prettyBytes = (size: number) => {
  // eslint-disable-next-line eqeqeq
  const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return Number((size / Math.pow(1000, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
}

export const prettySeconds = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor(seconds % 3600 / 60)
  const s = (seconds % 60).toFixed(2)

  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return `${h > 0 ? h + ' hr ' : ''}${m > 0 ? m + ' min ' : ''}${s} seg`
}

export const buildQueryParams = ({ customerId, status }) => {
  const params = {}

  Object.assign(
    params,
    customerId && { customerId },
    status && { status }
  )

  return new URLSearchParams(params).toString()
}