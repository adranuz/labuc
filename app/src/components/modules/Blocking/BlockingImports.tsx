import { Container } from '@mui/material'
import BlockingImportsTable from './BlockingImportsTable'

function BlockingImports () {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <BlockingImportsTable />
    </Container>
  )
}

export default BlockingImports
