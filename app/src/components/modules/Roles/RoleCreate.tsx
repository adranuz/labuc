import { useEffect, useState } from 'react'

import { Box, CircularProgress, Container } from '@mui/material'

import RoleForm from './RoleForm'
import apiUrl from '../../../config/api'

function RoleCreate () {
  const [isLoading, setIsLoading] = useState(false)
  const [permissions, setPermissions] = useState({})

  useEffect(() => {
    getPermissions()
  }, [])

  const getPermissions = () => {
    setIsLoading(true)

    const url = new URL(`${apiUrl}/permissions`)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPermissions(data)
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
          <RoleForm permissions={permissions} />
        )
      }
    </Container>
  )
}

export default RoleCreate
