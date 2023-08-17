import { Box, CircularProgress } from '@mui/material'

interface Props {
  show: boolean
}

export function LoadingContent ({ show }: Props) {
  if (!show) return <></>

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      padding={2}
    >
      <CircularProgress />
    </Box>
  )
}
