import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, CircularProgress, Container } from '@mui/material'

import CustomerForm from './CustomerForm'
import apiUrl from '../../../config/api'

interface Customer {
  id: string
  customId: string
  name: string
  email: string
  country: string
  registeredName: string
  rfc: string
  address: string
  economicActivity: string
  status: string
  sellerName: string
  sellerComments: string
  comissionTerm: string
  percentageComissions: number
  createdAt: Date
  updatedAt: Date
  devices: string[]
  skuStart: string
  skuEnd: string
  sku3m: boolean
  skuHBMF: boolean
  skuHBMPRE: boolean
  products: Product[]
  contacts: Contact[]
}

interface Contact {
  name: string
  email: string
  type: string
}

interface Product {
  name: string
  shortName: string
}

function CustomerDetails () {
  const params = useParams()

  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [customer, setCustomer] = useState<Customer | undefined>(undefined)
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
      .then(async res => await res.json())
      .then(data => {
        setCustomer(data)
      })
      .finally(() => setIsLoadingCustomer(false))
  }

  const getProducts = () => {
    setIsLoadingProducts(true)

    const url = new URL(`${apiUrl}/products`)

    fetch(url)
      .then(async res => await res.json())
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
              alignItems: 'center'
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
