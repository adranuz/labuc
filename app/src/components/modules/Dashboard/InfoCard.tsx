import { CardContent, Card, Divider, Typography, CardActions, Button, CardHeader, Box } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export function InfoCard ({ title, value, buttonLabel, onClick }) {
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
          <Typography variant='h4' component='p' color='primary'>
            {value}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          size='small'
          endIcon={<ArrowForwardIcon />}
          onClick={onClick}
        >
          {buttonLabel}
        </Button>
      </CardActions>
    </Card>
  )
}
