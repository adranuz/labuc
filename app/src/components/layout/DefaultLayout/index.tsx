import { Container, Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import logo from '../../../assets/logo.png'

function DefaultLayout() {
  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          sx={{ height: 64, my: 4 }}
          alt="Logo"
          src={logo}
        />
        <Outlet />
      </Box>
    </Container>
  )
}

export default DefaultLayout
