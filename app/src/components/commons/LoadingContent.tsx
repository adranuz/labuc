import { Box, CircularProgress } from '@mui/material'

interface Props {
  show: boolean
  disablePadding?: boolean
  sizeLoader?: number
}

export function LoadingContent ({ show, disablePadding = false, sizeLoader = 42 }: Props) {
  if (!show) return <></>

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      padding={disablePadding ? 0 : 2}
    >
      <CircularProgress size={sizeLoader} />
    </Box>
  )
}
