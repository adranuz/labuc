import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, CircularProgress, Container } from '@mui/material'

import CustomerForm from './CustomerForm'
import apiUrl from '../../../config/api'

function CustomerEdit () {
  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [customer, setCustomer] = useState({})
  const [productsList, setProductsList] = useState<any>({})

  useEffect(() => {
    const { id } = params
    getCustomer({ id })
    getProducts()
  }, [])

  const getCustomer = ({ id }) => {
    setIsLoading(true)

    const url = new URL(`${apiUrl}/customers/${id}`)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCustomer(data)
      })
      .finally(() => setIsLoading(false))
  }

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
    <Container sx={{ mt: 4, mb: 4 }}>
      {
        isLoading && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) || (
          <CustomerForm customer={customer} productsList={productsList} />
        )
      }
    </Container>
  )
}

export default CustomerEdit
