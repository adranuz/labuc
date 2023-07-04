import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, CircularProgress, Container } from '@mui/material'

import UserForm from './UserForm'
import apiUrl from '../../../config/api'

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

    const url = new URL(`${apiUrl}/users/${id}`)

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const rolesWithNameOnly = data.roles.map(({ name }) => {
          return { name }
        })
        setUser({...data, ...{ roles: rolesWithNameOnly }})
      })
      .finally(() => setIsLoading(false))
  }

  const getRoles = () => {
    setIsLoading(true)

    const url = new URL(`${apiUrl}/roles`)

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
          <UserForm user={user} roles={roles} />
        )
      }
    </Container>
  )
}

export default UserEdit
