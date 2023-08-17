import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, array } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Box, Card, CardContent, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, TextField, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useCommonStore } from '@/store/common'
import { API_URL } from '@/utils/constants'

const roleSchema = object({
  name: string({ required_error: 'Se requiere el nombre' })
    .nonempty({ message: 'Se requiere el nombre' }),
  permissions: array(object({
    action: string({ required_error: 'Se requiere el nombre del rol' })
  })).nonempty({ message: 'Se requiere al menos un permiso' })
})

interface Props {
  role?: any
  permissions?: any
}

function RoleEdit ({ role, permissions }: Props) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const showSnackbar = useCommonStore((state) => state.showSnackbar)

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue
  } = useForm<any>({
    defaultValues: {
      name: role?.name,
      permissions: role?.permissions || []
    },
    resolver: zodResolver(roleSchema)
  })

  const handleCheck = (checkedPermission) => {
    const { permissions } = getValues()
    const newPermissions = permissions?.find(permission => permission.action === checkedPermission.action)
      ? permissions?.filter(permission => permission.action !== checkedPermission.action)
      : [...(permissions ?? []), { action: checkedPermission.action }]
    setValue('permissions', newPermissions)
  }

  const onSubmit: SubmitHandler<any> = (data) => {
    if (role) {
      updateRole(role.id, data)
    } else {
      createRole(data)
    }
  }

  const updateRole = (id, data) => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/roles/${id}`)

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          showSnackbar('Error al intentar actualizar el rol', 'error')
          return
        }

        navigate('/admin/roles')
        showSnackbar('El rol se actualizó correctamente', 'success')
      })
      .catch(_ => showSnackbar('Error al actualizar crear el rol', 'error'))
      .finally(() => setIsLoading(false))
  }

  const createRole = (data) => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/roles`)

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          showSnackbar('Error al intentar crear el rol', 'error')
          return
        }

        toRoles()
        showSnackbar('El rol se creó correctamente', 'success')
      })
      .catch(_ => showSnackbar('Error al intentar crear el rol', 'error'))
      .finally(() => setIsLoading(false))
  }

  const handleClickBack = () => {
    toRoles()
  }

  const handleClickCancel = () => {
    toRoles()
  }

  const toRoles = () => {
    navigate('/admin/roles')
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Toolbar disableGutters>
        <IconButton
          size='large'
          color='inherit'
          sx={{ mr: 2 }}
          onClick={handleClickBack}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          component='h2'
          variant='h5'
          noWrap
          sx={{
            flexGrow: 1
          }}
        >
          Role
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2
          }}
        >
          <Button
            size='small'
            onClick={handleClickCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <LoadingButton
            variant='contained'
            size='small'
            loadingPosition='start'
            disableElevation
            startIcon={<SaveAltIcon />}
            type='submit'
            disabled={isLoading}
          >
            Guardar
          </LoadingButton>
        </Box>
      </Toolbar>

      <Card variant='outlined'>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                margin='normal'
                required
                fullWidth
                size='small'
                label='Nombre'
                autoFocus
                autoComplete='name'
                error={!!errors.name?.message}
                helperText={!!errors.name?.message && String(errors.name.message)}
                {...register('name')}
              />
            </Grid>
          </Grid>

          <FormControl sx={{ m: 1.5 }} variant='standard' error={!!errors.permissions?.message}>
            <FormLabel>Permisos</FormLabel>
            <Controller
              name='permissions'
              render={() => permissions?.data?.map((item) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      size='small'
                      color='secondary'
                      onChange={() => handleCheck(item)}
                      defaultChecked={!!role?.permissions?.find(role => role.action === item.action)}
                    />
                  }
                  key={item.id}
                  label={item.action}
                />
              ))}
              control={control}
            />
            <FormHelperText>{!!errors.permissions?.message && String(errors.permissions.message)}</FormHelperText>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  )
}

export default RoleEdit
