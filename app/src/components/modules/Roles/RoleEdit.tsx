import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, CircularProgress, Container } from '@mui/material'

import RoleForm from './RoleForm'

function RoleEdit () {
  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState({})
  const [permissions, setPermissions] = useState({})

  useEffect(() => {
    const { id } = params
    getRole({ id })
    getPermissions()
  }, [])

  const getRole = ({ id }) => {
    setIsLoading(true)

    const url = new URL(`http://localhost:3000/api/roles/${id}`)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const permissionsWithActionOnly = data.permissions.map(({ action }) => {
          return { action }
        })
        setRole({...data, ...{ permissions: permissionsWithActionOnly }})
      })
      .finally(() => setIsLoading(false))
  }

  const getPermissions = () => {
    setIsLoading(true)

    const url = new URL('http://localhost:3000/api/permissions')

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
          <RoleForm role={role} permissions={permissions} />
        )
      }
    </Container>
  )
}

export default RoleEdit
