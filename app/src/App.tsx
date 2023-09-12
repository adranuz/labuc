
import { Suspense } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { esES } from "@mui/x-date-pickers/locales";
import 'dayjs/locale/es'

import Routes from './routes'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#73308a'
    },
    secondary: {
      main: '#ff6b00'
    }
  }
})

function App () {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale='es'
      localeText={
        esES.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<div />}>
          <Routes />
        </Suspense>
      </ThemeProvider>
    </LocalizationProvider>
  )
}

export default App
