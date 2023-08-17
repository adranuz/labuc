import { useNavigate } from 'react-router-dom'

import { Toolbar as ToolbarMui, IconButton, Typography, Box } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface Props {
  title: string
  colorTitle?: string
  pathRouteForBackButton?: string
  disableGutters?: boolean
  children?: React.ReactNode
}

export function Toolbar ({ title, colorTitle = 'inherit', pathRouteForBackButton, disableGutters = false, children }: Props) {
  const navigate = useNavigate()

  const handleClickBack = () => {
    pathRouteForBackButton !== undefined && navigate(pathRouteForBackButton)
  }

  return (
    <ToolbarMui disableGutters={disableGutters}>
      {
        pathRouteForBackButton !== undefined && (
          <IconButton
            size='large'
            color='inherit'
            onClick={handleClickBack}
          >
            <ArrowBackIcon />
          </IconButton>
        )
      }
      <Typography
        component='h2'
        variant='h5'
        noWrap
        sx={
          disableGutters
            ? { flexGrow: 1, ml: 2 }
            : { flexGrow: 1 }
        }
        color={colorTitle}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2
        }}
      >
        {children}
      </Box>
    </ToolbarMui>
  )
}
