import { Container } from '@mui/material'
import CustomersTable from './CustomersTable'

function Customers () {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <CustomersTable />
    </Container>
  )
}

export default Customers
