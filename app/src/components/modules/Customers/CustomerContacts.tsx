import { Grid, TextField, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'

import { Controller } from 'react-hook-form'

function CustomerContacts ({readOnly, isLoading, control, fields, errors}) {
  return (
    <>
      {fields?.map((field, index) => {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={2}>
              {
                readOnly && (
                  <TextField
                    margin='normal'
                    fullWidth
                    size='small'
                    label='Tipo'
                    defaultValue={field?.type === 'com' ? 'Comercial' : 'Tecnología'}
                    disabled={readOnly}
                  />
                ) || (
                  <FormControl
                    margin='normal'
                    fullWidth
                    size='small'
                  >
                    <InputLabel>Tipo</InputLabel>
                    <Controller
                      name={`contacts.${index}.type`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label='Tipo'
                          error={Boolean(errors?.contacts && errors.contacts[index]?.type)}
                        >
                          <MenuItem value='com'>Comercial</MenuItem>
                          <MenuItem value='tec'>Tecnología</MenuItem>
                        </Select>
                      )}
                    />
                    <FormHelperText error>
                      {errors?.contacts && errors.contacts[index]?.type?.message}
                    </FormHelperText>
                  </FormControl>
                )
              }
            </Grid>

            <Grid item xs={12} md={5}>
            <Controller
                key={field?.id}
                name={`contacts.${index}.name`}
                control={control}
                render={({ field }) => (
                  <TextField
                    margin='normal'
                    fullWidth
                    size='small'
                    label='Nombre'
                    disabled={readOnly || isLoading}
                    error={Boolean(errors?.contacts && errors.contacts[index]?.name)}
                    helperText={errors?.contacts && errors.contacts[index]?.name?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <Controller
                key={field?.id}
                name={`contacts.${index}.email`}
                control={control}
                render={({ field }) => (
                  <TextField
                    margin='normal'
                    fullWidth
                    size='small'
                    label='Correo electrónico'
                    disabled={readOnly || isLoading}
                    error={Boolean(errors?.contacts && errors.contacts[index]?.email)}
                    helperText={errors?.contacts && errors.contacts[index]?.email?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        )
      })}
    </>
  )
}

export default CustomerContacts
