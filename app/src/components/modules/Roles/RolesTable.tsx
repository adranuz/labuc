import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

import { Box, LinearProgress, InputBase, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button } from '@mui/material'
import { styled, alpha, useTheme } from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

import { Toolbar } from '@/components/commons/Toolbar'
import ConfirmRoleDeletion from './ConfirmRoleDeletion'
import { API_URL } from '@/utils/constants'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: useTheme().palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.15) : alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: useTheme().palette.mode === 'dark' ? alpha(theme.palette.common.white, 0.25) : alpha(theme.palette.common.black, 0.15)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

function RolesTable () {
  const [searchParams, setSearchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [rolesList, setRolesList] = useState<any>({})
  const [filters, setFilters] = useState({
    perPage: parseInt(searchParams.get('perPage') ?? '10'),
    page: parseInt(searchParams.get('page') ?? '0'),
    q: searchParams.get('q') ?? ''
  })

  useEffect(() => {
    getRoles(filters)
  }, [])

  const getRoles = ({ perPage, page, q }) => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/roles`)

    const params = {
      perPage: String(perPage),
      page: String(page),
      q
    }

    url.search = new URLSearchParams(params).toString()

    fetch(url)
      .then(async res => await res.json())
      .then(data => {
        setRolesList(data)
      })
      .finally(() => setIsLoading(false))
  }

  const handleChangePage = (_: unknown, page: number) => {
    const newFilters = { ...filters, page }
    setFilters(newFilters)
    getRoles(newFilters)
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
    getRoles(newFilters)
    setSearchParams({
      perPage: String(newFilters.perPage),
      page: String(newFilters.page),
      q: newFilters.q
    })
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const q = event.target.value
    const newFilters = { ...filters, q, page: 0 }
    setFilters(newFilters)
    getRoles(newFilters)
    setSearchParams({
      perPage: String(newFilters.perPage),
      page: String(newFilters.page),
      q: newFilters.q
    })
  }

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Paper variant='outlined' sx={{ width: '100%', mb: 2 }}>
        <Toolbar title='Roles'>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Buscar…'
              type='search'
              inputProps={{ 'aria-label': 'search' }}
              onChange={onSearchChange}
              defaultValue={searchParams.get('q')}
            />
          </Search>

          <Button
            size='small'
            color='primary'
            startIcon={<AddIcon />}
            component={Link}
            to='/admin/roles/create'
          >
            Agregar
          </Button>
        </Toolbar>

        {isLoading && (
          <LinearProgress
            sx={{ position: 'absolute', top: '0', left: 0, right: 0, borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          />
        )}

        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align='right'>No. de permisos</TableCell>
                <TableCell align='right'>No. de usuarios</TableCell>
                <TableCell align='right'>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rolesList?.data?.map(({ id, name, permissions, _count }) => (
                <TableRow key={id}>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{name}</TableCell>
                  <TableCell align='right'>{permissions?.length}</TableCell>
                  <TableCell align='right'>{_count.users}</TableCell>
                  <TableCell>
                    <Stack direction='row' spacing={1} justifyContent='flex-end'>
                      <Button
                        size='small'
                        color='info'
                        startIcon={<EditIcon />}
                        component={Link}
                        to={`/admin/roles/${id}/edit`}
                      >
                        Editar
                      </Button>
                      <ConfirmRoleDeletion id={id} name={name} onFinished={() => getRoles(filters)} />
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
          count={rolesList?.total ?? 0}
          rowsPerPage={filters.perPage}
          page={rolesList?.page ?? 0}
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
      </Paper>
    </Box>
  )
}

export default RolesTable
