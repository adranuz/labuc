import { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { object, string, TypeOf } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { Box, Card, CardContent, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

const loginSchema = object({
  email: string({ required_error: 'Se requiere la dirección de correo electrónico' })
    .min(1, { message: 'Se requiere la dirección de correo electrónico' })
    .email('La dirección de correo electrónico es inválida'),
  password: string({ required_error: 'Se requiere la contraseña' }).min(1, { message: 'Se requiere la contraseña' }),
})

export type LoginInput = TypeOf<typeof loginSchema>

function Login () {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const { control, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit: SubmitHandler<LoginInput> = ({email, password}) => {
    setIsLoading(true)
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data?.token) {
        localStorage.setItem('token', data.token)
        navigate('/')
      }
    })
    .finally(() => setIsLoading(false))
  }
  
  return (
    <>
      <Typography component='h2' variant='h5' gutterBottom>
        Iniciar sesión
      </Typography>

      <Card variant='outlined'>
        <CardContent>
          <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name='email' control={control} render={({ field }) => (
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  size='small'
                  label='Correo electrónico'
                  autoFocus
                  autoComplete='email'
                  error={Boolean(errors?.email)}
                  helperText={errors?.email !== null ? errors?.email?.message : null}
                  {...field}
                />
              )}
            />

            <Controller
              name='password' control={control} render={({ field }) => (
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  size='small'
                  label='Contraseña'
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(errors?.password)}
                  helperText={errors?.password !== null ? errors?.password?.message : null}
                  {...field}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Alternar la visibilidad de la contraseña"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />

            <LoadingButton
              loading={isLoading}
              variant='contained'
              size='small'
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type='submit'
            >
              Continuar
            </LoadingButton>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default Login
 