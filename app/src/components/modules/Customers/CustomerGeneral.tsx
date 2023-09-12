
import { useState } from 'react'
import { type Control, type FieldErrors, type UseFormRegister } from 'react-hook-form'

import { Card, CardContent, CardHeader, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import { Controller } from 'react-hook-form'

interface Props {
  readOnly: boolean
  isLoading: boolean
  control: Control<Customer, any>
  errors: FieldErrors
  register: UseFormRegister<any>
}

interface Customer {
  id: string
  customId: string
  name: string
  email: string
  country: string
  registeredName: string
  rfc: string
  address: string
  economicActivity: string
  status: string
  sellerName: string
  sellerComments: string
  comissionTerm: string
  percentageComissions: number
  createdAt: Date
  updatedAt: Date
  devices: string[]
  skuStart: string
  skuEnd: string
  sku3m: boolean
  skuHBMF: boolean
  skuHBMPRE: boolean
  dbName: string
  products: Product[]
  contacts: Contact[]
}

interface Contact {
  name: string
  email: string
  type: string
}

interface Product {
  name: string
  shortName: string
}

function CustomerGeneral ({ readOnly, isLoading, control, errors, register }: Props) {
  const [showCopyEmail, setShowCopyEmail] = useState(false)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Card variant='outlined'>
          <CardHeader
            title={<Typography component='h1' variant='h6'>Información básica</Typography>}
            sx={{ pb: 0 }}
          />
          <CardContent>
            <Stack direction='row' spacing={2} useFlexGap>
              <TextField
                margin='normal'
                fullWidth
                size='small'
                label='ID'
                disabled={readOnly || isLoading}
                error={Boolean(errors.customId?.message)}
                helperText={Boolean(errors.customId?.message) && String(errors.customId?.message)}
                {...register('customId')}
              />

              {
                (readOnly || isLoading) && (
                  <TextField
                    margin='normal'
                    fullWidth
                    size='small'
                    label='Estatus'
                    disabled={readOnly || isLoading}
                    error={!!errors.status?.message}
                    helperText={!!errors.status?.message && String(errors.status.message)}
                    {...register('status')}
                  />
                ) || (
                  <FormControl
                    margin='normal'
                    fullWidth
                    size='small'
                  >
                    <InputLabel>Estatus</InputLabel>
                    <Controller
                      name='status'
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label='Estatus'
                          error={!!errors.status?.message}
                        >
                          <MenuItem value=''><em>Ninguno</em></MenuItem>
                          <MenuItem value='Activo'>Activo</MenuItem>
                          <MenuItem value='Prospecto'>Prospecto</MenuItem>
                          <MenuItem value='Pruebas'>Pruebas</MenuItem>
                          <MenuItem value='Suspendido'>Suspendido</MenuItem>
                        </Select>
                      )}
                    />
                    <FormHelperText error>
                      {!!errors.status?.message && String(errors.status.message)}
                    </FormHelperText>
                  </FormControl>
                )
              }
            </Stack>

            <TextField
              margin='normal'
              fullWidth
              size='small'
              label='Nombre'
              disabled={readOnly || isLoading}
              error={!!errors.name?.message}
              helperText={!!errors.name?.message && String(errors.name.message)}
              {...register('name')}
            />

            <TextField
              margin='normal'
              fullWidth
              size='small'
              label='Correo electrónico'
              type='email'
              disabled={isLoading}
              error={!!errors.email?.message}
              helperText={!!errors.email?.message && String(errors.email.message)}
              {...register('email')}
              onMouseEnter={() => readOnly && setShowCopyEmail(true)}
              onMouseLeave={() => readOnly && setShowCopyEmail(false)}
              InputProps={{
                readOnly,
                endAdornment: showCopyEmail && (
                  <InputAdornment position='end'>
                    <IconButton edge='end' size='small'>
                      <ContentCopyIcon fontSize='small' />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              margin='normal'
              fullWidth
              size='small'
              label='País'
              disabled={readOnly || isLoading}
              error={!!errors.country?.message}
              helperText={!!errors.country?.message && String(errors.country.message)}
              {...register('country')}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Card variant='outlined'>
          <CardHeader
            title={<Typography component='h1' variant='h6'>Información fiscal</Typography>}
            sx={{ pb: 0 }}
          />
          <CardContent>
            {
              (readOnly || isLoading) && (
                <TextField
                  margin='normal'
                  fullWidth
                  size='small'
                  label='Giro'
                  disabled={readOnly || isLoading}
                  error={!!errors.economicActivity?.message}
                  helperText={!!errors.economicActivity?.message && String(errors.economicActivity.message)}
                  {...register('economicActivity')}
                />
              ) || (
                <FormControl
                  margin='normal'
                  fullWidth
                  size='small'
                >
                  <InputLabel>Giro</InputLabel>
                  <Controller
                    name='economicActivity'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='Giro'
                        error={!!errors.economicActivity?.message}
                      >
                        <MenuItem value=''><em>Ninguno</em></MenuItem>
                        <MenuItem value='Distribuidor'>Distribuidor</MenuItem>
                        <MenuItem value='Fintech'>Fintech</MenuItem>
                        <MenuItem value='Operador / Distribuidor'>Operador / Distribuidor</MenuItem>
                      </Select>
                    )}
                  />
                  <FormHelperText error>
                    {!!errors.economicActivity?.message && String(errors.economicActivity.message)}
                  </FormHelperText>
                </FormControl>
              )
            }

            <TextField
              margin='normal'
              fullWidth
              size='small'
              label='Razón social'
              disabled={readOnly || isLoading}
              error={!!errors.registeredName?.message}
              helperText={!!errors.registeredName?.message && String(errors.registeredName.message)}
              {...register('registeredName')}
            />

            <TextField
              margin='normal'
              fullWidth
              size='small'
              label='RFC'
              disabled={readOnly || isLoading}
              error={!!errors.rfc?.message}
              helperText={!!errors.rfc?.message && String(errors.rfc.message)}
              {...register('rfc')}
            />

            <TextField
              margin='normal'
              fullWidth
              size='small'
              label='Domicilio fiscal'
              disabled={readOnly || isLoading}
              error={!!errors.address?.message}
              helperText={!!errors.address?.message && String(errors.address.message)}
              {...register('address')}
            />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Card variant='outlined'>
          <CardHeader
            title={<Typography component='h1' variant='h6'>Información de venta</Typography>}
            sx={{ pb: 0 }}
          />
          <CardContent>
            <TextField
              margin='normal'
              fullWidth
              size='small'
              label='Nombre del vendedor'
              disabled={readOnly || isLoading}
              error={!!errors.sellerName?.message}
              helperText={!!errors.sellerName?.message && String(errors.sellerName.message)}
              {...register('sellerName')}
            />

            <TextField
              margin='normal'
              fullWidth
              size='small'
              label='Vigencia de comisión'
              type='date'
              InputLabelProps={{ shrink: true }}
              disabled={readOnly || isLoading}
              error={!!errors.comissionTerm?.message}
              helperText={!!errors.comissionTerm?.message && String(errors.comissionTerm.message)}
              {...register('comissionTerm')}
            />

            <TextField
              margin='normal'
              fullWidth
              size='small'
              label='Porcentaje de comisión'
              type='number'
              InputProps={{
                inputProps: {
                  disabled: readOnly || isLoading,
                  step: 1,
                  min: 0
                },
                endAdornment: (
                  <InputAdornment position='end'>%</InputAdornment>
                )
              }}
              disabled={readOnly || isLoading}
              error={!!errors.percentageComissions?.message}
              helperText={!!errors.percentageComissions?.message && String(errors.percentageComissions.message)}
              {...register('percentageComissions')}
            />

            <TextField
              margin='normal'
              fullWidth
              size='small'
              label='Comentarios del vendedor'
              disabled={readOnly || isLoading}
              error={!!errors.sellerComments?.message}
              helperText={!!errors.sellerComments?.message && String(errors.sellerComments.message)}
              {...register('sellerComments')}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CustomerGeneral
