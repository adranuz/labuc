import { useEffect, useState } from 'react'

import { Paper } from '@mui/material'

import { Toolbar } from '@/components/commons/Toolbar'
import { NuovoReportLogProcessTable } from './NuovoReportLogProcessTable'
import { API_URL } from '@/utils/constants'
import { LogProcess } from '@/types/LogProcess'
import { LoadingContent } from '@/components/commons/LoadingContent'

interface Props {
  id: string
}

export function NuovoReportLogProcess ({ id }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [logProcess, setLogProcess] = useState<LogProcess[]>([])

  useEffect(() => {
    getProcessFile(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getProcessFile = (id: string) => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/blocking/reports/${id}/log`)

    const params = {
      type: 'process'
    }

    url.search = new URLSearchParams(params).toString()

    fetch(url)
      .then(async res => await res.json())
      .then((data: LogProcess[]) => {
        setLogProcess(data)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Paper variant='outlined' sx={{ width: '100%', mb: 2 }}>
      <Toolbar title='Log de procesos' />
      <LoadingContent show={isLoading} />
      {!isLoading && <NuovoReportLogProcessTable logProcess={logProcess} />}
    </Paper>
  )
}
