import { Container, Typography, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import InfoCard from './InfoCard'

function Dashboard () {
  const navigate = useNavigate()

  const getAuthenticatedUserName = () => {
    const token = localStorage.getItem('token')
    if (!token) return
    const object = decodeJwt(token)
    return object?.name
  }

  const decodeJwt = (jwt: string) => {
    return JSON.parse(decodeURIComponent(escape(atob(jwt.split('.')[1]))))
  }

  const currentDate = new Date().toLocaleDateString('es', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant='h5' component='h2'>
        Bienvenido { getAuthenticatedUserName() }
      </Typography>
      <Typography variant='subtitle1' component='h2'>
        { currentDate } 
      </Typography>
      
      <Grid container spacing={3} marginTop={1}>
        <Grid item xs={12} md={4}>
          <InfoCard
            title='Clientes activos'
            value='189'
            buttonLabel='Ver clientes'
            onClick={() => navigate('/admin/customers?q=Activo')} />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard
            title='Clientes prospectos'
            value='3'
            buttonLabel='Ver clientes'
            onClick={() => navigate('/admin/customers?q=Prospecto')} />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard
            title='Clientes suspendidos'
            value='1'
            buttonLabel='Ver clientes'
            onClick={() => navigate('/admin/customers?q=Suspendido')} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
