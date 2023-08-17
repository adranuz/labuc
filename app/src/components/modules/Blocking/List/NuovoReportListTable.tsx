import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack, Backdrop, CircularProgress } from '@mui/material'
import BuildIcon from '@mui/icons-material/Build'
import { LoadingButton } from '@mui/lab'

import { BooleanIndicator } from '@/components/commons/BooleanIndicator'
import { API_URL } from '@/utils/constants'
import { useCommonStore } from '@/store/common'
import { getTotalFilesSize, getTotalProcessingTime, localeDate, prettyBytes, prettySeconds } from '@/utils/utils'
import { type NuovoReports } from '@/types/NuovoReport'
import { type Filters } from '@/types/Filters'

interface Props {
  nuovoReports: NuovoReports | undefined
  filters: Filters
  setFilters: React.Dispatch<React.SetStateAction<Filters>>
  getNuovoReports: (filters: Filters) => void
}

export function NuovoReportListTable ({ nuovoReports, filters, setFilters, getNuovoReports }: Props) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const showSnackbar = useCommonStore((state) => state.showSnackbar)

  const [isLoading, setIsLoading] = useState(false)

  const handleChangePage = (_: unknown, page: number) => {
    const newFilters = { ...filters, page }
    setFilters(newFilters)
    getNuovoReports(newFilters)
    setSearchParams({
      perPage: String(newFilters.perPage),
      page: String(newFilters.page),
      q: newFilters.q
    })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const perPage = parseInt(event.target.value)
    const newFilters = { ...filters, perPage, page: 0 }
    setFilters(newFilters)
    getNuovoReports(newFilters)
    setSearchParams({
      perPage: String(newFilters.perPage),
      page: String(newFilters.page),
      q: newFilters.q
    })
  }

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
        getNuovoReports(filters)
        showSnackbar('El consolidado se generó correctamente', 'success')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleClickDetails = (id: string) => {
    navigate(`/tool/blocking/reports/${id}`, {
      state: filters
    })
  }

  return (
    <>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Fecha del reporte</TableCell>
              <TableCell align='right'>Total de archivos</TableCell>
              <TableCell align='right'>Tamaño total de los archivos</TableCell>
              <TableCell align='right'>Duración total de procesos</TableCell>
              <TableCell align='center'>Consolidado</TableCell>
              <TableCell align='right'>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nuovoReports?.data.map(({ id, reportedAt, logProcess, logFile, isConsolidated, isLatestImported }) => (
              <TableRow
                key={id}
                selected={id === searchParams.get('selected')}
                hover
                onClick={() => handleClickDetails(id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{Boolean(reportedAt) && localeDate({ date: reportedAt, withTime: false })}</TableCell>
                <TableCell align='right'>{logFile.length}</TableCell>
                <TableCell align='right'>{prettyBytes(getTotalFilesSize(logFile))}</TableCell>
                <TableCell align='right'>{prettySeconds(getTotalProcessingTime(logProcess))}</TableCell>
                <TableCell align='center'><BooleanIndicator value={isConsolidated} /></TableCell>
                <TableCell>
                  <Stack direction='row' spacing={1} justifyContent='flex-end'>
                    <LoadingButton
                      size='small'
                      color='primary'
                      loadingPosition='start'
                      startIcon={<BuildIcon />}
                      onClick={(event) => handleClickBuildReport(event, id)}
                      loading={isLoading && isLatestImported}
                      disabled={isConsolidated || !isLatestImported}
                    >
                      Generar Consolidado
                    </LoadingButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component='div'
        count={nuovoReports?.total ?? 0}
        rowsPerPage={filters.perPage}
        page={nuovoReports?.page ?? 0}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage='Filas por página:'
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`}
        showFirstButton
        showLastButton
        getItemAriaLabel={(type) =>
          type === 'first'
            ? 'Ir a la primera página'
            : type === 'last'
              ? 'Ir a la última página'
              : type === 'next'
                ? 'Ir a la página siguiente'
                : 'Regresar a la pagina anterior'}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}
