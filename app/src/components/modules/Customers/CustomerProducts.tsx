import { useEffect, useState } from 'react'

import { Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material'

import apiUrl from '../../../config/api'

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

function CustomerProducts ({products, readOnly}) {
  const [isLoading, setIsLoading] = useState(false)
  const [productsList, setProductsList] = useState<any>({})

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    setIsLoading(true)

    const url = new URL(`${apiUrl}/products`)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProductsList(data)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
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
                  />
                }
                label={item.name}
              />
            )
          })
        }
        </FormControl>
      </Grid>

      <Grid item xs={12} md={3}>
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
                  />
                }
                label={item.name}
              />
            )
          })
        }
        </FormControl>
      </Grid>

      <Grid item xs={12} md={3}>
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

      <Grid item xs={12} md={3}>
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
