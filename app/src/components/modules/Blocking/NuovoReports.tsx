import { Container } from '@mui/material'
import { NuovoReportList } from './List/NuovoReportList'

function NuovoReports () {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <NuovoReportList />
    </Container>
  )
}

export default NuovoReports
