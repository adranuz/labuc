import { Checkbox, FormControl, FormControlLabel, FormLabel, FormHelperText, Grid, InputLabel, MenuItem, Select, Switch } from '@mui/material'

import { Controller } from 'react-hook-form'

const devices: any = [
  { name: 'Android', value: 'android' },
  { name: 'iOS', value: 'ios' },
  { name: 'Windows', value: 'windows' },
]

const skuStart = [
  { name: 'HBM3M' },
  { name: 'HBM3A' },
  { name: 'HBM1A' },
  { name: 'HBMF ' },
  { name: 'HBMPRE' },
]

const skuEnd = [
  { name: 'HBM3M' },
  { name: 'HBM3A' },
  { name: 'HBM1A' },
  { name: 'HBMF ' },
  { name: 'HBMPRE' },
]

function CustomerProducts ({productsList, products, readOnly, isLoading, control, register, errors, getValues, setValue}) {
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
        <FormControl variant='standard' error={!!errors.products?.message}>
          <FormLabel>Productos Generales</FormLabel>
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
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <FormControl variant='standard' error={!!errors.devices?.message}>
          <FormLabel>Dispositivos</FormLabel>
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
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
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
                  skuStart.map(({name}) => <MenuItem value={name}>{name}</MenuItem>)
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
                  skuEnd.map(({name}) => <MenuItem value={name}>{name}</MenuItem>)
                }
              </Select>
            )}
          />
          <FormHelperText error>
            {!!errors.skuEnd?.message && String(errors.skuEnd.message)}
          </FormHelperText>
        </FormControl>

        <FormControl variant='standard' sx={{ mt: 1 }} >
          <FormLabel>Contar 3 meses</FormLabel>
          <FormControlLabel
            control={
              <Switch
                color='secondary'
                disabled={readOnly || isLoading}
                defaultChecked={getValues()?.sku3m}
                {...register('sku3m')}
              />
            }
            label='Habilitar'
          />
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default CustomerProducts
