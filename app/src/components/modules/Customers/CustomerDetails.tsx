import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, CircularProgress, Container } from '@mui/material'

import CustomerForm from './CustomerForm'

function CustomerDetails () {
  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [customer, setCustomer] = useState({})

  useEffect(() => {
    const { id } = params
    getCustomer({ id })
  }, [])

  const getCustomer = ({ id }) => {
    setIsLoading(true)

    const url = new URL(`http://localhost:3000/api/customers/${id}`)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCustomer(data)
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
          <CustomerForm customer={customer} readOnly />
        )
      }
    </Container>
  )
}

export default CustomerDetails
