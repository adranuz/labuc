import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, CircularProgress, Container } from '@mui/material'

import CustomerForm from './CustomerForm'
import apiUrl from '../../../config/api'

function CustomerDetails() {
  const params = useParams()

  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [customer, setCustomer] = useState({})
  const [productsList, setProductsList] = useState<any>({})

  useEffect(() => {
    const { id } = params
    getCustomer({ id })
    getProducts()
  }, [])

  const getCustomer = ({ id }) => {
    setIsLoadingCustomer(true)

    const url = new URL(`${apiUrl}/customers/${id}`)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCustomer(data)
      })
      .finally(() => setIsLoadingCustomer(false))
  }

  const getProducts = () => {
    setIsLoadingProducts(true)

    const url = new URL(`${apiUrl}/products`)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProductsList(data)
      })
      .finally(() => setIsLoadingProducts(false))
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {
        (isLoadingCustomer || isLoadingProducts) && (
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
          <CustomerForm customer={customer} productsList={productsList} readOnly />
        )
      }
    </Container>
  )
}

export default CustomerDetails
