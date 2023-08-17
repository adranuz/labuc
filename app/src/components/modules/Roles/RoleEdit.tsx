import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, CircularProgress, Container } from '@mui/material'

import RoleForm from './RoleForm'
import { API_URL } from '@/utils/constants'

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

    const url = new URL(`${API_URL}/roles/${id}`)

    fetch(url)
      .then(async res => await res.json())
      .then(data => {
        const permissionsWithActionOnly = data.permissions.map(({ action }) => {
          return { action }
        })
        setRole({ ...data, ...{ permissions: permissionsWithActionOnly } })
      })
      .finally(() => setIsLoading(false))
  }

  const getPermissions = () => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/permissions`)

    fetch(url)
      .then(async res => await res.json())
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
              alignItems: 'center'
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
