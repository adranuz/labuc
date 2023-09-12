import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import logoWhite from '@/assets/logo_white.png'

export function NotFound () {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        color: 'white',
        gap: 2
      }}
    >
      <Box
        component='img'
        sx={{ height: 48, mb: 2 }}
        alt='Logo'
        src={logoWhite}
      />
      <Typography variant='h3'>
        404
      </Typography>
      <Typography variant='h6'>
        Esta página no se encuentra disponible. Lo sentimos.
      </Typography>
      <Button
        color='secondary'
        variant='outlined'
        component={Link}
        to='/'
      >
        Ir a la página principal
      </Button>
    </Box>
  )
}
