import { useNavigate, useLocation } from 'react-router-dom'

import { Box, FormControl, Grid, CardActions, InputAdornment, InputLabel, MenuItem, Select, TextField, IconButton, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import EditIcon from '@mui/icons-material/Edit'

function CustomerGeneral ({customer, readOnly}) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClickEdit = () => {
    navigate(`/admin/customers/${customer.id}/edit`, {
      state: location.state
    })
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    navigateToCustomers()
    //navigate(`/admin/customers/${customer.id}`)
  }

  const navigateToCustomers = () => {
    if (location.state) {
      const {perPage, page, q} = location.state
      navigate({
        pathname: '/admin/customers',
        search: `?perPage=${perPage}&page=${page}&q=${q}`,
      })
    } else {
      navigate('/admin/customers')
    }
  }

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='ID'
            defaultValue={customer?.customId}
            inputProps={{ disabled: readOnly }}
            InputProps={
              readOnly && {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      size='small'
                      onClick={handleClickEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='Nombre'
            defaultValue={customer?.name}
            inputProps={{ disabled: readOnly }}
            InputProps={
              readOnly && {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      size='small'
                      onClick={handleClickEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='Correo electrónico'
            type='email'
            defaultValue={customer?.email}
            inputProps={{ disabled: readOnly }}
            InputProps={
              readOnly && {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      size='small'
                      onClick={handleClickEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='País'
            defaultValue={customer?.country}
            inputProps={{ disabled: readOnly }}
            InputProps={
              readOnly && {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      size='small'
                      onClick={handleClickEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          {
            readOnly && (
              <TextField
                margin='normal'
                fullWidth
                size='small'
                label='Giro'
                defaultValue={customer?.economicActivity}
                inputProps={{ disabled: true }}
                InputProps={
                  readOnly && {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          size='small'
                          onClick={handleClickEdit}
                        >
                          <EditIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }
              />
            ) || (
              <FormControl
                margin='normal'
                fullWidth
                size='small'
              >
                <InputLabel>Giro</InputLabel>
                <Select
                  label='Giro'
                  defaultValue={customer?.economicActivity}
                >
                  <MenuItem value=''><em>Ninguno</em></MenuItem>
                  <MenuItem value='Distribuidor'>Distribuidor</MenuItem>
                  <MenuItem value='Fintech'>Fintech</MenuItem>
                  <MenuItem value='Operador / Distribuidor'>Operador / Distribuidor</MenuItem>
                </Select>
              </FormControl>
            )
          }
        </Grid>

        <Grid item xs={12} md={4}>
          {
            readOnly && (
              <TextField
                margin='normal'
                fullWidth
                size='small'
                label='Estatus'
                defaultValue={customer?.status}
                inputProps={{ disabled: true }}
                InputProps={
                  readOnly && {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          size='small'
                          onClick={handleClickEdit}
                        >
                          <EditIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }
              />
            ) || (
              <FormControl
                margin='normal'
                fullWidth
                size='small'
              >
                <InputLabel>Estatus</InputLabel>
                <Select
                  label='Estatus'
                  defaultValue={customer?.status}
                >
                  <MenuItem value=''><em>Ninguno</em></MenuItem>
                  <MenuItem value='Activo'>Activo</MenuItem>
                  <MenuItem value='Prospecto'>Prospecto</MenuItem>
                  <MenuItem value='Pruebas'>Pruebas</MenuItem>
                  <MenuItem value='Suspendido'>Suspendido</MenuItem>
                </Select>
              </FormControl>
            )
          }
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='RFC'
            defaultValue={customer?.rfc}
            inputProps={{ disabled: readOnly }}
            InputProps={
              readOnly && {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      size='small'
                      onClick={handleClickEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='Razón social'
            defaultValue={customer?.registeredName}
            inputProps={{ disabled: readOnly }}
            InputProps={
              readOnly && {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      size='small'
                      onClick={handleClickEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='Domicilio fiscal'
            defaultValue={customer?.address}
            inputProps={{ disabled: readOnly }}
            InputProps={
              readOnly && {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      size='small'
                      onClick={handleClickEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='Nombre del vendedor'
            defaultValue={customer?.sellerName}
            inputProps={{ disabled: readOnly }}
            InputProps={
              readOnly && {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      size='small'
                      onClick={handleClickEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='Vigencia de comisión'
            type='date'
            InputLabelProps={{ shrink: true }}
            defaultValue={customer?.comissionTerm?.slice(0, 10)}
            inputProps={{ disabled: readOnly }}
            InputProps={
              readOnly && {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      size='small'
                      onClick={handleClickEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='Porcentaje de comisión'
            type='number'
            InputProps={
              readOnly && {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      size='small'
                      onClick={handleClickEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                )
              } || {
              inputProps: {
                disabled: readOnly,
                step: 1,
                min: 0,
              },
              endAdornment: (
                <InputAdornment position='end'>%</InputAdornment>
              )
            }}
            defaultValue={customer?.percentageComissions || 0}
            inputProps={{ disabled: readOnly }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='Comentarios del vendedor'
            defaultValue={customer?.sellerComments}
            inputProps={{ disabled: readOnly }}
            InputProps={
              readOnly && {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      size='small'
                      onClick={handleClickEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }
          />
        </Grid>
      </Grid>

      {
        readOnly || (
          <CardActions sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Button size='small' onClick={navigateToCustomers}>Cancelar</Button>
            <LoadingButton
              variant='contained'
              size='small'
              disableElevation
              type='submit'
            >
              Guardar
            </LoadingButton>
          </CardActions>
        )
      }
    </Box>
  )
}

export default CustomerGeneral
