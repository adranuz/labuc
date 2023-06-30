import { CardContent, Card, Divider, Typography, CardActions, Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

function CustomerCard ({title, value, buttonLabel, onClick}) {

  return (
    <Card variant='outlined' >
      <CardContent>
        <Typography variant='h6' component='h2' color='primary' gutterBottom>
          { title }
        </Typography>
        <Typography variant='h4' component='p'>
          { value }
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          size='small'
          endIcon={<ArrowForwardIcon />}
          onClick={onClick}
        >
          { buttonLabel }
        </Button>
      </CardActions>
    </Card>
  )
}

export default CustomerCard
