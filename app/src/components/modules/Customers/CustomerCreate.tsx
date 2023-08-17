import { useEffect, useState } from 'react'
import { Box, CircularProgress, Container } from '@mui/material'

import CustomerForm from './CustomerForm'
import { API_URL } from '@/utils/constants'

function CustomerCreate () {
  const [isLoading, setIsLoading] = useState(false)
  const [productsList, setProductsList] = useState<any>({})

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/products`)

    fetch(url)
      .then(async res => await res.json())
      .then(data => {
        setProductsList(data)
      })
      .finally(() => setIsLoading(false))
  }
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {
        isLoading && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        ) || (
          <CustomerForm productsList={productsList} newCustomer />
        )
      }
    </Container>
  )
}

export default CustomerCreate
