import { Container } from '@mui/material'
import UsersTable from './UsersTable'

function Users () {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <UsersTable />
    </Container>
  )
}

export default Users
