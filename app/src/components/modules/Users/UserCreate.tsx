import { useEffect, useState } from 'react'

import { Box, CircularProgress, Container } from '@mui/material'

import UserForm from './UserForm'
import { API_URL } from '@/utils/constants'

function UserCreate () {
  const [isLoading, setIsLoading] = useState(false)
  const [roles, setRoles] = useState({})

  useEffect(() => {
    getRoles()
  }, [])

  const getRoles = () => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/roles`)

    fetch(url)
      .then(async res => await res.json())
      .then(data => {
        setRoles(data)
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
          <UserForm roles={roles} />
        )
      }
    </Container>
  )
}

export default UserCreate
