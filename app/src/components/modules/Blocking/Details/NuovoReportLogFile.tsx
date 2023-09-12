import { useEffect } from 'react'

import { Paper } from '@mui/material'

import { Toolbar } from '@/components/commons/Toolbar'
import { NuovoReportLogFileTable } from './NuovoReportLogFileTable'
import { LoadingContent } from '@/components/commons/LoadingContent'
import { useBlockingStore } from '@/store/blocking'

interface Props {
  id: string
}

export function NuovoReportLogFile ({ id }: Props) {
  const [
    getNuovoReportLogFile,
    isLoading,
    logFile
  ] = useBlockingStore((state) => [
    state.getNuovoReportLogFile,
    state.getNuovoReportLogFileLoading,
    state.nuovoReportLogFile
  ])

  useEffect(() => {
    getNuovoReportLogFile(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Paper variant='outlined' sx={{ width: '100%', mb: 2 }}>
      <Toolbar title='Log de archivos' />
      <LoadingContent show={isLoading} />
      {!isLoading && <NuovoReportLogFileTable logFile={logFile} />}
    </Paper>
  )
}
