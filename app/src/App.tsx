
import { Suspense } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Routes from './routes'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#73308a',
    },
    secondary: {
      main: '#ff6b00',
    },
  }
})

function App () {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<div />}>
        <Routes />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
