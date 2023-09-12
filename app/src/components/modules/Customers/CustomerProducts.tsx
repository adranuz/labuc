import { CardContent, Checkbox, FormControl, FormControlLabel, FormLabel, FormHelperText, Grid, InputLabel, MenuItem, Select, CardHeader, Card, Stack, Typography, TextField } from '@mui/material'

import { Controller } from 'react-hook-form'

const devices: any = [
  { name: 'Android', value: 'android' },
  { name: 'iOS', value: 'ios' },
  { name: 'Windows', value: 'windows' }
]

const skuStart = [
  { name: 'HBM3M' },
  { name: 'HBM1A' },
  { name: 'HBM3A' }
]

const skuEnd = [
  { name: 'HBM3M' },
  { name: 'HBM1A' },
  { name: 'HBM3A' }
]

function CustomerProducts ({ productsList, products, readOnly, isLoading, control, register, errors, getValues, setValue }) {
  const handleCheckDevice = (checkedDevice) => {
    const { devices } = getValues()
    const newDevices = devices?.find(device => device === checkedDevice.value)
      ? devices?.filter(device => device !== checkedDevice.value)
      : [...(devices ?? []), checkedDevice.value]
    setValue('devices', newDevices)
  }

  const handleCheckProduct = (checkedProduct) => {
    const { products } = getValues()
    const newProducts = products?.find(product => product.shortName === checkedProduct.shortName)
      ? products?.filter(product => product.shortName !== checkedProduct.shortName)
      : [...(products ?? []), { shortName: checkedProduct.shortName }]
    setValue('products', newProducts)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <Card variant='outlined'>
          <CardHeader
            title={<Typography component='h1' variant='h6'>Productos generales</Typography>}
            sx={{ pb: 0 }}
          />
          <CardContent>
            <FormControl variant='standard' error={!!errors.products?.message}>
              <Controller
                name='products'
                render={() => productsList?.data?.map((item) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        size='small'
                        color='secondary'
                        disabled={readOnly || isLoading}
                        onChange={() => handleCheckProduct(item)}
                        defaultChecked={!!products?.find(product => product.shortName === item.shortName)}
                      />
                    }
                    key={item.id}
                    label={item.name}
                  />
                ))}
                control={control}
              />
              <FormHelperText>{!!errors.products?.message && String(errors.products.message)}</FormHelperText>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Card variant='outlined' sx={{ height: '100%' }}>
          <CardHeader
            title={<Typography component='h1' variant='h6'>Dispositivos</Typography>}
            sx={{ pb: 0 }}
          />
          <CardContent>
            <FormControl variant='standard' error={!!errors.devices?.message}>
              <Controller
                name='devices'
                render={() => devices?.map((item) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        size='small'
                        color='secondary'
                        disabled={readOnly || isLoading}
                        onChange={() => handleCheckDevice(item)}
                        defaultChecked={!!getValues()?.devices?.find(device => device === item.value)}
                      />
                    }
                    key={item.name}
                    label={item.name}
                  />
                ))}
                control={control}
              />
              <FormHelperText>{!!errors.devices?.message && String(errors.devices.message)}</FormHelperText>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Card variant='outlined' sx={{ height: '100%' }}>
          <CardHeader
            title={<Typography component='h1' variant='h6'>SKUs</Typography>}
            sx={{ pb: 0 }}
          />
          <CardContent>
            <Stack direction='row' spacing={2} useFlexGap>
              <FormControl
                margin='normal'
                fullWidth
                size='small'
              >
                <InputLabel>SKU Start</InputLabel>
                <Controller
                  name='skuStart'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label='SKU Start'
                      disabled={readOnly || isLoading}
                      error={!!errors.skuStart?.message}
                    >
                      <MenuItem value=''><em>Ninguno</em></MenuItem>
                      {
                        skuStart.map(({ name }) => <MenuItem value={name}>{name}</MenuItem>)
                      }
                    </Select>
                  )}
                />
                <FormHelperText error>
                  {!!errors.skuStart?.message && String(errors.skuStart.message)}
                </FormHelperText>
              </FormControl>

              <FormControl
                margin='normal'
                fullWidth
                size='small'
              >
                <InputLabel>SKU End</InputLabel>
                <Controller
                  name='skuEnd'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label='SKU End'
                      disabled={readOnly || isLoading}
                      error={!!errors.skuEnd?.message}
                    >
                      <MenuItem value=''><em>Ninguno</em></MenuItem>
                      {
                        skuEnd.map(({ name }) => <MenuItem value={name}>{name}</MenuItem>)
                      }
                    </Select>
                  )}
                />
                <FormHelperText error>
                  {!!errors.skuEnd?.message && String(errors.skuEnd.message)}
                </FormHelperText>
              </FormControl>
            </Stack>

            <FormControl variant='standard' sx={{ mt: 1 }}>
              <FormLabel>Otros</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    color='secondary'
                    disabled={readOnly || isLoading}
                    defaultChecked={getValues()?.sku3m}
                    {...register('sku3m')}
                  />
                }
                label='Contar 3 meses'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    color='secondary'
                    disabled={readOnly || isLoading}
                    defaultChecked={getValues()?.skuHBMF}
                    {...register('skuHBMF')}
                  />
                }
                label='HBMF'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    color='secondary'
                    disabled={readOnly || isLoading}
                    defaultChecked={getValues()?.skuHBMPRE}
                    {...register('skuHBMPRE')}
                  />
                }
                label='HBMPRE'
              />
            </FormControl>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Card variant='outlined' sx={{ height: '100%' }}>
          <CardHeader
            title={<Typography component='h1' variant='h6'>PAC</Typography>}
            sx={{ pb: 0 }}
          />
          <CardContent>
            <TextField
              margin='normal'
              fullWidth
              size='small'
              label='Nombre de la BD'
              disabled={readOnly || isLoading}
              error={!!errors.dbName?.message}
              helperText={!!errors.dbName?.message && String(errors.dbName.message)}
              {...register('dbName')}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default CustomerProducts
