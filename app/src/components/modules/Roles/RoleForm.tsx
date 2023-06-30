import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, array } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Box, Card, CardContent, CardActions, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, TextField, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { useCommonStore } from '../../../store/common'
import apiUrl from '../../../config/api'

const roleSchema = object({
  name: string({ required_error: 'Se requiere el nombre' })
    .nonempty({ message: 'Se requiere el nombre' }),
  permissions: array(object({
      action: string({ required_error: 'Se requiere el nombre del rol' })
    })).nonempty({ message: 'Se requiere al menos un permiso' }),
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
    setValue,
  } = useForm<any>({
    defaultValues: {
      name: role?.name,
      permissions: role?.permissions || []
    },
    resolver: zodResolver(roleSchema),
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

    const url = new URL(`${apiUrl}:3000/api/roles/${id}`)

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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

    const url = new URL(`${apiUrl}:3000/api/roles`)

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) {
        showSnackbar('Error al intentar crear el rol', 'error')
        return
      }

      navigate('/admin/roles')
      showSnackbar('El rol se creó correctamente', 'success')
    })
    .catch(_ => showSnackbar('Error al intentar crear el rol', 'error'))
    .finally(() => setIsLoading(false))
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
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

          <CardActions sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <Button size='small' onClick={() => navigate('/admin/roles')}>Cancelar</Button>
            <LoadingButton
              loading={isLoading}
              variant='contained'
              size='small'
              disableElevation
              type='submit'
            >
              Guardar
            </LoadingButton>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  )
}

export default RoleEdit
