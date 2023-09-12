import { useEffect } from 'react'

import { Paper } from '@mui/material'

import { LoadingContent } from '@/components/commons/LoadingContent'
import { NuovoReportDetailsTable } from './NuovoReportDetailsTable'
import { useBlockingStore } from '@/store/blocking'

interface Props {
  id: string
}

export function NuovoReportDetails ({ id }: Props) {
  const [
    getNuovoReport,
    isLoading,
    nuovoReport
  ] = useBlockingStore((state) => [
    state.getNuovoReport,
    state.getNuovoReportLoading,
    state.nuovoReport
  ])

  useEffect(() => {
    getNuovoReport(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Paper variant='outlined' sx={{ width: '100%', mb: 2 }}>
      <LoadingContent show={isLoading} />
      {!isLoading && <NuovoReportDetailsTable nuovoReport={nuovoReport} />}
    </Paper>
  )
}
