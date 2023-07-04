import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'

function CustomerGeneral ({customer, readOnly}) {
   return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='ID'
            defaultValue={customer?.customId}
            disabled={readOnly}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='Nombre'
            defaultValue={customer?.name}
            disabled={readOnly}
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
            disabled={readOnly}
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
            disabled={readOnly}
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
                disabled={readOnly}
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
                disabled={readOnly}
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
            disabled={readOnly}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='Razón social'
            defaultValue={customer?.registeredName}
            disabled={readOnly}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            margin='normal'
            fullWidth
            size='small'
            label='Domicilio fiscal'
            defaultValue={customer?.address}
            disabled={readOnly}
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
            disabled={readOnly}
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
            disabled={readOnly}
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
                disabled: readOnly,
                step: 1,
                min: 0,
              },
              endAdornment: (
                <InputAdornment position='end'>%</InputAdornment>
              )
            }}
            defaultValue={customer?.percentageComissions || 0}
            disabled={readOnly}
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
            disabled={readOnly}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerGeneral
