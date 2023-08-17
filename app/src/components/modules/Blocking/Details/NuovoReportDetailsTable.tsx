import { useState } from 'react'

import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import BuildIcon from '@mui/icons-material/Build'
import { LoadingButton } from '@mui/lab'

import { BooleanIndicator } from '@/components/commons/BooleanIndicator'
import { API_URL } from '@/utils/constants'
import { useCommonStore } from '@/store/common'
import { getTotalFilesSize, getTotalProcessingTime, localeDate, prettyBytes, prettySeconds } from '@/utils/utils'
import { type NuovoReport } from '@/types/NuovoReport'

interface Props {
  nuovoReport: NuovoReport | undefined
  refreshData: () => void
}

export function NuovoReportDetailsTable ({ nuovoReport, refreshData }: Props) {
  const showSnackbar = useCommonStore((state) => state.showSnackbar)

  const [isLoading, setIsLoading] = useState(false)

  if (nuovoReport === undefined) return <></>

  const { reportedAt, logFile, logProcess, isConsolidated } = nuovoReport

  const handleClickBuildReport = (event: React.MouseEvent<unknown>, id: string) => {
    event.stopPropagation()
    event.preventDefault()
    createNuovoReportConsolidated(id)
  }

  const createNuovoReportConsolidated = (id: string) => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/blocking/reports/${id}/consolidated`)

    fetch(url, {
      method: 'POST'
    })
      .then(async res => await res.json())
      .then(() => {
        refreshData()
        showSnackbar('El consolidado se generó correctamente', 'success')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <TableContainer>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell variant='footer'>Fecha del reporte</TableCell>
            <TableCell variant='footer' align='right'>Total de archivos</TableCell>
            <TableCell variant='footer' align='right'>Tamaño total de los archivos</TableCell>
            <TableCell variant='footer' align='right'>Duración total de procesos</TableCell>
            <TableCell variant='footer' align='center'>Consolidado</TableCell>
            <TableCell variant='footer' align='right'>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell variant='head'>{localeDate({ date: reportedAt, withTime: false })}</TableCell>
            <TableCell variant='head' align='right'>{logFile.length}</TableCell>
            <TableCell variant='head' align='right'>{prettyBytes(getTotalFilesSize(logFile))}</TableCell>
            <TableCell variant='head' align='right'>{prettySeconds(getTotalProcessingTime(logProcess))}</TableCell>
            <TableCell variant='head' align='center'><BooleanIndicator value={isConsolidated} /></TableCell>
            <TableCell>
              <Stack direction='row' spacing={1} justifyContent='flex-end'>
                <LoadingButton
                  size='small'
                  color='primary'
                  loadingPosition='start'
                  startIcon={<BuildIcon />}
                  onClick={(event) => handleClickBuildReport(event, nuovoReport.id)}
                  loading={isLoading}
                  disabled={isConsolidated}
                >
                  Generar Consolidado
                </LoadingButton>
              </Stack>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
