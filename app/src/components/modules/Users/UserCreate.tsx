import { useEffect, useState } from 'react'

import { Box, CircularProgress, Container } from '@mui/material'

import UserForm from './UserForm'

function UserCreate () {
  const [isLoading, setIsLoading] = useState(false)
  const [roles, setRoles] = useState({})

  useEffect(() => {
    getRoles()
  }, [])

  const getRoles = () => {
    setIsLoading(true)

    const url = new URL('http://localhost:3000/api/roles')

    fetch(url)
      .then(res => res.json())
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
              alignItems: 'center',
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
