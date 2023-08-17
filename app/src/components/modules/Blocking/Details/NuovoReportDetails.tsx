import { useEffect, useState } from 'react'

import { Paper } from '@mui/material'

import { LoadingContent } from '@/components/commons/LoadingContent'
import { NuovoReportDetailsTable } from './NuovoReportDetailsTable'
import { API_URL } from '@/utils/constants'
import { type NuovoReport } from '@/types/NuovoReport'

interface Props {
  id: string
}

export function NuovoReportDetails ({ id }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [nuovoReport, setNuovoReport] = useState<NuovoReport | undefined>(undefined)

  useEffect(() => {
    getNuovoReport(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getNuovoReport = (id: string) => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/blocking/reports/${id}`)

    fetch(url)
      .then(async res => await res.json())
      .then((data: NuovoReport) => {
        setNuovoReport(data)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Paper variant='outlined' sx={{ width: '100%', mb: 2 }}>
      <LoadingContent show={isLoading} />
      {!isLoading && <NuovoReportDetailsTable nuovoReport={nuovoReport} refreshData={() => getNuovoReport(id)} />}
    </Paper>
  )
}
