import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, CircularProgress, Container } from '@mui/material'

import UserForm from './UserForm'
import { API_URL } from '@/utils/constants'

function UserEdit () {
  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({})
  const [roles, setRoles] = useState({})

  useEffect(() => {
    const { id } = params
    getUser({ id })
    getRoles()
  }, [])

  const getUser = ({ id }) => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/users/${id}`)

    fetch(url)
      .then(async res => await res.json())
      .then(data => {
        const rolesWithNameOnly = data.roles.map(({ name }) => {
          return { name }
        })
        setUser({ ...data, ...{ roles: rolesWithNameOnly } })
      })
      .finally(() => setIsLoading(false))
  }

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
          <UserForm user={user} roles={roles} />
        )
      }
    </Container>
  )
}

export default UserEdit
