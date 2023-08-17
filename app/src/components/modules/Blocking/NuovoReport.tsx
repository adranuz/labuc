import { useParams } from 'react-router-dom'

import { Container, Grid } from '@mui/material'

import { Toolbar } from '@/components/commons/Toolbar'
import { NuovoReportDetails } from './Details/NuovoReportDetails'
import { NuovoReportLogProcess } from './Details/NuovoReportLogProcess'
import { NuovoReportLogFile } from './Details/NuovoReportLogFile'

export function NuovoReport () {
  const params = useParams()
  const { id } = params

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Toolbar
        title='Reporte HB'
        pathRouteForBackButton='/tool/blocking/reports'
        disableGutters
      />
      {id !== undefined && (
        <>
          <NuovoReportDetails id={id} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <NuovoReportLogProcess id={id} />
            </Grid>
            <Grid item xs={12} md={6}>
              <NuovoReportLogFile id={id} />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  )
}
