import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, array } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Box, Button, Card, CardContent, CardActions, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { useCommonStore } from '../../../store/common'
import apiUrl from '../../../config/api'

const updateUserSchema = object({
  name: string({ required_error: 'Se requiere el nombre' })
    .nonempty({ message: 'Se requiere el nombre' }),
  email: string({ required_error: 'Se requiere la dirección de correo electrónico' })
    .nonempty({ message: 'Se requiere la dirección de correo electrónico' })
    .email('La dirección de correo electrónico es inválida'),
  roles: array(object({
      name: string({ required_error: 'Se requiere el nombre del rol' })
    })).nonempty({ message: 'Se requiere al menos un rol' }),
})

const createUserSchema = object({
  name: string({ required_error: 'Se requiere el nombre' })
    .min(1, { message: 'Se requiere el nombre' }),
  email: string({ required_error: 'Se requiere la dirección de correo electrónico' })
    .min(1, { message: 'Se requiere la dirección de correo electrónico' })
    .email('La dirección de correo electrónico es inválida'),
  roles: array(object({
      name: string({ required_error: 'Se requiere el nombre del rol' })
    })).nonempty({ message: 'Se requiere al menos un rol' }),
  password: string({ required_error: 'Se requiere la contraseña' })
    .nonempty({ message: 'Se requiere la contraseña' })
    .min(8, 'La contraseña debe tener más de 8 caracteres'),
})

interface Props {
  user?: any
  roles?: any
}

function UserEdit ({ user, roles }: Props) {
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
      name: user?.name,
      email: user?.email,
      roles: user?.roles || []
    },
    resolver: zodResolver(user ? updateUserSchema : createUserSchema),
  })

  const handleCheck = (checkedRole) => {
    const { roles } = getValues()
    const newRoles = roles?.find(role => role.name === checkedRole.name)
      ? roles?.filter(role => role.name !== checkedRole.name)
      : [...(roles ?? []), { name: checkedRole.name }]
    setValue('roles', newRoles)
  }

  const onSubmit: SubmitHandler<any> = (data) => {
    if (user) {
      updateUser(user.id, data)
    } else {
      createUser(data)
    }
  }

  const updateUser = (id, data) => {
    setIsLoading(true)

    const url = new URL(`${apiUrl}/users/${id}`)

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) {
        showSnackbar('Error al intentar acualizar el usuario', 'error')
        return
      }

      navigate('/admin/users')
      showSnackbar('El usuario se actualizó correctamente', 'success')
    })
    .catch(_ => showSnackbar('Error al intentar acualizar el usuario', 'error'))
    .finally(() => setIsLoading(false))
  }

  const createUser = (data) => {
    setIsLoading(true)

    const url = new URL(`${apiUrl}/users`)

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          showSnackbar('Error al intentar crear el usuario', 'error')
          return
        }

        navigate('/admin/users')
        showSnackbar('El usuario se creó correctamente', 'success')
      })
      .catch(_ => showSnackbar('Error al intentar crear el usuario', 'error'))
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

              <Grid item xs={12} md={6}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  size='small'
                  label='Correo electrónico'
                  autoComplete='email'
                  error={!!errors.email?.message}
                  helperText={!!errors.email?.message && String(errors.email.message)}
                  {...register('email')}
                />
              </Grid>
            </Grid>

            {!user && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                      margin='normal'
                      required
                      fullWidth
                      size='small'
                      label='Contraseña'
                      type='password'
                      error={!!errors.password?.message}
                      helperText={!!errors.password?.message && String(errors.password.message)}
                      {...register('password')}
                    />
                </Grid>
              </Grid>
            )}

          <FormControl sx={{ m: 1.5 }} variant='standard' error={!!errors.roles?.message}>
            <FormLabel>Roles</FormLabel>
            <Controller
              name='roles'
              render={() => roles?.data?.map((item) => (
                <FormControlLabel
                  sx={{ textTransform: 'capitalize' }}
                  control={
                    <Checkbox
                      size='small'
                      color='secondary'
                      onChange={() => handleCheck(item)}
                      defaultChecked={!!user?.roles?.find(role => role.name === item.name)}
                    />
                  }
                  key={item.id}
                  label={item.name}
                />
              ))}
              control={control}
            />
            <FormHelperText>{!!errors.roles?.message && String(errors.roles.message)}</FormHelperText>
          </FormControl>
        </CardContent>
        <CardActions sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <Button size='small' onClick={() => navigate('/admin/users')}>Cancelar</Button>
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
      </Card>
    </Box>
  )
}

export default UserEdit
