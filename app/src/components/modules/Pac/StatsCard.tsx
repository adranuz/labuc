import { Link } from 'react-router-dom'

import { CardContent, Card, Typography, Divider, Button, CardActions, Box, CardHeader, CircularProgress } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

interface Props {
  title: string
  subtitle?: string
  value: number
  isLoading: boolean
  href?: string
  goToLabel?: string
}

export function StatsCard ({ title, subtitle = '', value, isLoading, href }: Props) {
  return (
    <Card variant='outlined'>
      <CardHeader
        title={
          <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        }
        sx={{ paddingBottom: 0 }}
      />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {
            isLoading
              ? <CircularProgress size={62} />
              : (
                <>
                  <Typography variant='h4' component='p' color='primary'>
                    {value}
                  </Typography>
                  {
                    Boolean(subtitle) && (
                      <Typography variant='caption'>
                        {subtitle}
                      </Typography>
                    )
                  }
                </>
              )
          }
        </Box>
      </CardContent>
      {
        href !== undefined && (
          <>
            <Divider />
            <CardActions>
              {/* <Box
                sx={{
                  display: 'flex',
                  gap: 1
                }}
              > */}
              <Button
                size='small'
                endIcon={<ArrowForwardIcon />}
                component={Link}
                to={href}
                disabled={isLoading}
              >
                Ver detalles
              </Button>
              {/* <Button
                  size='small'
                  endIcon={<DownloadIcon />}
                  disabled={isLoading}
                >
                  Descargar
                </Button> */}
              {/* </Box> */}
            </CardActions>
          </>
        )
      }

    </Card>
  )
}
