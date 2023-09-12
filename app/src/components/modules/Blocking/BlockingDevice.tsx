import { useParams } from 'react-router-dom'

import { Container, Grid } from '@mui/material'

import { Toolbar } from '@/components/commons/Toolbar'
import { BlockingDeviceDetails } from './Details/BlockingDeviceDetails'
import { BlockingDeviceImportLogProcess } from './Details/BlockingDeviceImportLogProcess'
import { BlockingDeviceImportLogFile } from './Details/BlockingDeviceImportLogFile'

export function BlockingDevice () {
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
          <BlockingDeviceDetails id={id} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <BlockingDeviceImportLogProcess id={id} />
            </Grid>
            <Grid item xs={12} md={6}>
              <BlockingDeviceImportLogFile id={id} />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  )
}
