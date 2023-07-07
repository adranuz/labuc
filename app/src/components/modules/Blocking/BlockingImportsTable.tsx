import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Box, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography, Button, Tooltip } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

import apiUrl from '../../../config/api'

function BlockingImportsTable () {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [importsList, setImportsList] = useState<any>({})
  const [filters, setFilters] = useState({
    perPage: parseInt(searchParams.get('perPage') || '10'),
    page: parseInt(searchParams.get('page') || '0'),
    q: searchParams.get('q') || ''
  })

  useEffect(() => {
    getImports(filters)
  }, [])

  const getImports = ({ perPage, page, q }) => {
    
    setIsLoading(true)

    const url = new URL(`${apiUrl}/blocking/imports`)

    const params = {
      perPage: String(perPage),
      page: String(page), 
      q,
    }

    url.search = new URLSearchParams(params).toString()

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setImportsList(data)
      })
      .finally(() => setIsLoading(false))
  }

  const handleChangePage = (_: unknown, page: number) => {
    const newFilters = {...filters, page }
    setFilters(newFilters)
    getImports(newFilters)
    setSearchParams({
      perPage: String(newFilters.perPage),
      page: String(newFilters.page),
      q: newFilters.q,
    })
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const perPage = parseInt(event.target.value)
    const newFilters = {...filters, perPage, page: 0 }
    setFilters(newFilters)
    getImports(newFilters)
    setSearchParams({
      perPage: String(newFilters.perPage),
      page: String(newFilters.page),
      q: newFilters.q,
    })
  }

  const handleClickCreate = () => {
    navigate('/tool/blocking/imports/new')
  }

  const getDifferenceInSeconds = (startedAt: string, finishedAt: string) => {
    const startedAtDate = new Date(startedAt)
    const finishedAtDate = new Date(finishedAt)

    return (finishedAtDate.getTime() - startedAtDate.getTime()) / 1000
  }

  const prettySeconds = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor(seconds % 3600 / 60)
    const s = (seconds % 60).toFixed(2)
    
    return `${h > 0 ? h + ' hr ' : ''}${m > 0 ? m + ' min ' : ''}${s} seg`  
 }

  const prettyBytes = (size: number) => {
    const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
    return Number((size / Math.pow(1000, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i]
  }

  const localeDate = (date: string) => {
    return new Date(date).toLocaleString('es', {
      timeZone: 'UTC',
      dateStyle: 'medium',
      timeStyle: 'short',
      hour12: true,
    })
  }

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Paper variant='outlined' sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            color='primary'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Importaciones
          </Typography>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <Button
              size='small'
              color='primary'
              startIcon={<UploadIcon />}
              onClick={() => handleClickCreate()}
            >
              Importar archivos
            </Button>
          </Box>
        </Toolbar>

        { isLoading && (
          <LinearProgress
            sx={{ position: 'absolute', top: '0', left: 0, right: 0, borderRadius: 4 }}
          />
        ) }

        <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Fecha de importación</TableCell>
              <TableCell align='right'>Total de archivos</TableCell>
              <TableCell align='right'>Tamaño total de los archivos</TableCell>
              <TableCell align='center'>Restablecer tablas</TableCell>
              <TableCell align='right'>Duración de la importación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {importsList?.data?.map((row) => (
              <TableRow key={row.id} selected={row.id === searchParams.get('selected')}>
                <TableCell>{localeDate(row.createdAt)}</TableCell>
                <TableCell align='right'>{row.totalFiles}</TableCell>
                <TableCell align='right'>{prettyBytes(row.totalFilesSize)}</TableCell>
                <TableCell align='center'>
                  {
                    row.truncate
                      ? (
                        <Tooltip title='Si' arrow>
                          <CheckIcon color='success' />
                        </Tooltip>
                        )
                      : (
                        <Tooltip title='No' arrow>
                          <CloseIcon color='error' />
                        </Tooltip>
                      )
                  }
                  </TableCell>
                <TableCell align='right'>{prettySeconds(getDifferenceInSeconds(row.startedAt, row.finishedAt))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component='div'
          count={importsList?.total || 0}
          rowsPerPage={filters.perPage}
          page={importsList?.page || 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Filas por página:'
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
          showFirstButton
          showLastButton
          getItemAriaLabel={(type) =>
            type === 'first'
              ? 'Ir a la primera página'
              : type === 'last'
              ? 'Ir a la última página'
              : type === 'next'
              ? 'Ir a la página siguiente'
              : 'Regresar a la pagina anterior'
          }
        />
    </Paper>
    </Box>
  )
}

export default BlockingImportsTable
