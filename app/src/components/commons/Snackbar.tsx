import { Alert, Snackbar as SnackbarMui } from "@mui/material"
import { useCommonStore } from '../../store/common'

function Snackbar () {
  const snackbarOpen = useCommonStore((state) => state.snackbarOpen)
  const snackbarMessage = useCommonStore((state) => state.snackbarMessage)
  const snackbarSeverity = useCommonStore((state) => state.snackbarSeverity)
  const hideSnackbar = useCommonStore((state) => state.hideSnackbar)

  return (
    <SnackbarMui
      open={snackbarOpen}
      autoHideDuration={5000}
      onClose={hideSnackbar}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
    <Alert
      onClose={hideSnackbar}
      severity={snackbarSeverity}
    >
      {snackbarMessage}
    </Alert>
  </SnackbarMui>
  )
}

export default Snackbar
