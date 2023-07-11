import { Typography, Stack, Card, Grid, IconButton, TextField, FormControl, FormHelperText, InputLabel, MenuItem, Select, CardHeader, CardContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import { alpha } from '@mui/material/styles'

import { Controller } from 'react-hook-form'

function CustomerContacts({ readOnly, isLoading, control, fields, errors, deleteContactByIndex, addContact }) {
  const handleClickDelete = (index: number) => {
    deleteContactByIndex(index)
  }

  return (
    <Grid container spacing={3}>
      {fields?.map((field, index) => (
        <Grid item xs={12} md={4}>
          <Card
            variant='outlined'
            sx={{ height: '300px' }}
          >
            <CardHeader
              title='Información de contacto'
              action={
                readOnly || (
                  <IconButton
                    size='small'
                    onClick={() => handleClickDelete(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                )
              }
            />
            <CardContent>
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
            </CardContent>
          </Card>
        </Grid>
      ))}
      {
        readOnly || (
          <Grid item xs={12} md={4}>
            <Card
              variant='outlined'
              sx={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                ':hover': {
                  backgroundColor: (theme) => alpha(theme.palette.common.black, 0.02)
                },
              }}
              onClick={addContact}
            >
              <CardContent>
                <Stack
                  spacing={1}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <AddIcon />
                  <Typography variant='caption'>
                    Agregar contacto
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )
      }
    </Grid>
  )
}

export default CustomerContacts
