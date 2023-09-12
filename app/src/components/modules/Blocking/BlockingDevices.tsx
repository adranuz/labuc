import { Container } from '@mui/material'
import { BlockingDeviceList } from './List/BlockingDeviceList'

function BlockingDevices () {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <BlockingDeviceList />
    </Container>
  )
}

export default BlockingDevices
