import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Backdrop, CircularProgress } from '@mui/material'
import BuildIcon from '@mui/icons-material/Build'
import { LoadingButton } from '@mui/lab'

import { BooleanIndicator } from '@/components/commons/BooleanIndicator'
import { getTotalFilesSize, getTotalProcessingTime, localeDate, prettyBytes, prettySeconds } from '@/utils/utils'
import { type BlockingDevice } from '@/types/BlockingDevice'
import { useBlockingStore } from '@/store/blocking'

interface Props {
  blockingDevice: BlockingDevice | undefined
}

export function BlockingDeviceDetailsTable ({ blockingDevice }: Props) {
  const [
    buildBlockingDeviceConsolidatedReport,
    isLoading
  ] = useBlockingStore((state) => [
    state.buildBlockingDeviceConsolidatedReport,
    state.buildBlockingDeviceConsolidatedReportLoading
  ])

  if (blockingDevice === undefined) return <></>

  const { reportedAt, logFile, logProcess, isConsolidated } = blockingDevice

  const handleClickBuildReport = (event: React.MouseEvent<unknown>, id: string) => {
    event.stopPropagation()
    event.preventDefault()
    buildBlockingDeviceConsolidatedReport({ id, refreshBlockingDeviceOnSuccess: true })
  }

  return (
    <>
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
                    onClick={(event) => handleClickBuildReport(event, blockingDevice.id)}
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}
