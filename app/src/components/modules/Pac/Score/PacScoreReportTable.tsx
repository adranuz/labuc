import { useSearchParams } from 'react-router-dom'

import { localeDate } from "@/utils/utils";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Chip } from "@mui/material";

import { usePacStore } from '@/store/pac'
import { BooleanIndicator } from '@/components/commons/BooleanIndicator';

interface Props {
  customerId?: string
  status?: string
  startDate?: string
  endDate?: string
}

export function PacScoreReportTable ({ customerId, status, startDate, endDate }: Props) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [
    filters,
    setFilters,
    getScoreReportList,
    scoreReportList
  ] = usePacStore((state) => [
    state.getScoreReportListFilters,
    state.setScoreReportListFilters,
    state.getScoreReportList,
    state.scoreReportList
  ])

  const handleChangePage = (_: unknown, page: number) => {
    if (customerId === undefined) return
    const newFilters = { ...filters, page }
    setFilters(newFilters)
    getScoreReportList(customerId, status, startDate, endDate)
    searchParams.set('page', String(page))
    setSearchParams(searchParams)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (customerId === undefined) return
    const perPage = parseInt(event.target.value)
    const newFilters = { ...filters, perPage, page: 0 }
    setFilters(newFilters)
    getScoreReportList(customerId, status, startDate, endDate)
    searchParams.set('perPage', String(perPage))
    setSearchParams(searchParams)
  }
  return (
    <>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>No. de crédito</TableCell>
              <TableCell>Referencia</TableCell>
              <TableCell>No. Solicitud</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align='center'>Score</TableCell>
              <TableCell align='center'>Dispositivo validado previamente</TableCell>
              <TableCell>ID de dispositivo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scoreReportList?.data?.map(({ status, creditId, previouslyValidatedDevice, reference, requestDate, requestId, score, deviceId }) => (
              <TableRow
                key={creditId}
                hover
              >
                <TableCell>{creditId}</TableCell>
                <TableCell>{reference}</TableCell>
                <TableCell>{requestId}</TableCell>
                <TableCell>{Boolean(requestDate) && localeDate({ date: requestDate })}</TableCell>
                <TableCell>
                  <Chip
                    label={status}
                    variant='outlined'
                    size='small'
                    color={
                      status === 'Aceptado' ? 'success' : 'warning'
                    }
                  />
                </TableCell>
                <TableCell align='center'>{score}</TableCell>
                <TableCell align='center'>
                  <BooleanIndicator value={previouslyValidatedDevice === 'Si'} />
                </TableCell>
                <TableCell>
                  {deviceId}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component='div'
        count={scoreReportList?.total ?? 0}
        rowsPerPage={filters.perPage}
        page={scoreReportList?.page ?? 0}
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
    </>
  )
}