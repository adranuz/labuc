import { Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material'

const devices = [
  { name: 'Android' },
  { name: 'iOS' },
  { name: 'Windows' },
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

function CustomerProducts ({productsList, products, readOnly}) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6} lg={3}>
        <FormControl variant='standard'>
        <FormLabel>Productos General</FormLabel>
        {
          productsList?.data?.map(item => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    color='secondary'
                    defaultChecked={!!products?.find(product => product.shortName === item.shortName)}
                    disabled={readOnly}
                  />
                }
                label={item.name}
              />
            )
          })
        }
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <FormControl variant='standard'>
        <FormLabel>Dispositivos</FormLabel>
        {
          devices?.map(item => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    color='secondary'
                    defaultChecked={false}
                    disabled={readOnly}
                  />
                }
                label={item.name}
              />
            )
          })
        }
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <FormControl variant='standard'>
        <FormLabel>Dispositivos Start</FormLabel>
        <RadioGroup>
        {
          skuStart?.map(item => {
            return (
              <FormControlLabel
                value={item.name}
                control={
                  <Radio
                    size='small'
                    color='secondary'
                    disabled={readOnly}
                  />
                }
                label={item.name}
              />
            )
          })
        }
        </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6} lg={3}>
        <FormControl variant='standard'>
        <FormLabel>Dispositivos End</FormLabel>
        <RadioGroup>
        {
          skuEnd?.map(item => {
            return (
              <FormControlLabel
                value={item.name}
                control={
                  <Radio
                    size='small'
                    color='secondary'
                    disabled={readOnly}
                  />
                }
                label={item.name}
              />
            )
          })
        }
        </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default CustomerProducts
