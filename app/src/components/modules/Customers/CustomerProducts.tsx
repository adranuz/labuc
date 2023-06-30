import { Checkbox, FormControl, FormControlLabel, FormLabel, Grid } from '@mui/material'

const devices = [
  { name: 'Android' },
  { name: 'iOS' },
  { name: 'Windows' },
]

function CustomerProducts ({products, readOnly}) {
  console.log(readOnly)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <FormControl variant='standard'>
        <FormLabel>Productos</FormLabel>
        {
          products?.map(product => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    color='secondary'
                    defaultChecked
                  />
                }
                label={product.name}
              />
            )
          })
        }
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl variant='standard'>
        <FormLabel>Dispositivos</FormLabel>
        {
          devices?.map(device => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                  size='small'
                  color='secondary'
                  defaultChecked
                  />
                }
                label={device.name}
              />
            )
          })
        }
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default CustomerProducts
