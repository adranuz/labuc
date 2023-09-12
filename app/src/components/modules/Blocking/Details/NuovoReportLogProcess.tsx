import { useEffect } from 'react'

import { Paper } from '@mui/material'

import { Toolbar } from '@/components/commons/Toolbar'
import { NuovoReportLogProcessTable } from './NuovoReportLogProcessTable'
import { LoadingContent } from '@/components/commons/LoadingContent'
import { useBlockingStore } from '@/store/blocking'

interface Props {
  id: string
}

export function NuovoReportLogProcess ({ id }: Props) {
  const [
    getNuovoReportLogProcess,
    isLoading,
    logProcess
  ] = useBlockingStore((state) => [
    state.getNuovoReportLogProcess,
    state.getNuovoReportLogProcessLoading,
    state.nuovoReportLogProcess
  ])

  useEffect(() => {
    getNuovoReportLogProcess(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Paper variant='outlined' sx={{ width: '100%', mb: 2 }}>
      <Toolbar title='Log de procesos' />
      <LoadingContent show={isLoading} />
      {!isLoading && <NuovoReportLogProcessTable logProcess={logProcess} />}
    </Paper>
  )
}
