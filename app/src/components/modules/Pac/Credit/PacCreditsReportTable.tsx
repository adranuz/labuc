import { useSearchParams } from 'react-router-dom'

import { localeDate } from "@/utils/utils";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Chip } from "@mui/material";

import { usePacStore } from '@/store/pac'

interface Props {
  customerId?: string
  status?: string
  startDate?: string
  endDate?: string
}

export function PacCreditsReportTable ({ customerId, status, startDate, endDate }: Props) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [
    filters,
    setFilters,
    getCreditReportList,
    creditReportList
  ] = usePacStore((state) => [
    state.getCreditReportListFilters,
    state.setCreditReportListFilters,
    state.getCreditReportList,
    state.creditReportList
  ])

  const handleChangePage = (_: unknown, page: number) => {
    if (customerId === undefined) return
    const newFilters = { ...filters, page }
    setFilters(newFilters)
    getCreditReportList(customerId, status, startDate, endDate)
    searchParams.set('page', String(page))
    setSearchParams(searchParams)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (customerId === undefined) return
    const perPage = parseInt(event.target.value)
    const newFilters = { ...filters, perPage, page: 0 }
    setFilters(newFilters)
    getCreditReportList(customerId, status, startDate, endDate)
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
              <TableCell>Marca</TableCell>
              <TableCell>Modelo</TableCell>
              <TableCell>IMEI</TableCell>
              <TableCell>Fecha de venta</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {creditReportList?.data?.map(({ creditId, branch, model, imei, saleDate, creditStatus }) => (
              <TableRow
                key={creditId}
                hover
              >
                <TableCell>{creditId}</TableCell>
                <TableCell>{branch}</TableCell>
                <TableCell>{model}</TableCell>
                <TableCell>{imei}</TableCell>
                <TableCell>{Boolean(saleDate) && localeDate({ date: saleDate })}</TableCell>
                <TableCell>
                  <Chip
                    label={creditStatus}
                    variant='outlined'
                    size='small'
                    color='info'
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component='div'
        count={creditReportList?.total ?? 0}
        rowsPerPage={filters.perPage}
        page={creditReportList?.page ?? 0}
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