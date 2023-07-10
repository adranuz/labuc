import { FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import { Controller } from 'react-hook-form'

function CustomerGeneral ({readOnly, isLoading, control, errors, register}) {
   return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='ID'
            disabled={readOnly || isLoading}
            error={!!errors.customId?.message}
            helperText={!!errors.customId?.message && String(errors.customId.message)}
            {...register('customId')}
          />
        </Grid>

        <Grid item xs={12} md={4}>
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
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='Correo electrónico'
            type='email'
            disabled={readOnly || isLoading}
            error={!!errors.email?.message}
            helperText={!!errors.email?.message && String(errors.email.message)}
            {...register('email')}
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
            disabled={readOnly || isLoading}
            error={!!errors.country?.message}
            helperText={!!errors.country?.message && String(errors.country.message)}
            {...register('country')}
          />
        </Grid>

        <Grid item xs={12} md={4}>
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
        </Grid>

        <Grid item xs={12} md={4}>
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
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
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
        </Grid>

        <Grid item xs={12} md={4}>
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
        </Grid>

        <Grid item xs={12} md={4}>
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
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
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
        </Grid>

        <Grid item xs={12} md={4}>
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
        </Grid>

        <Grid item xs={12} md={4}>
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
                min: 0,
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
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
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
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerGeneral
