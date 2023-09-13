import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type AlertSeverity = 'success' | 'info' | 'warning' | 'error'

interface State {
  snackbarOpen: boolean
  snackbarMessage: string | undefined
  snackbarSeverity: AlertSeverity | undefined
  showSnackbar: (message: string, severity: AlertSeverity) => void
  hideSnackbar: () => void
}

export const useCommonStore = create<State>()(devtools((set) => {
  return {
    snackbarOpen: false,
    snackbarMessage: undefined,
    snackbarSeverity: undefined,

    showSnackbar: (message: string, severity: AlertSeverity) => {
      set({ snackbarOpen: true, snackbarMessage: message, snackbarSeverity: severity }, false, 'SHOW_SNACKBAR')
    },

    hideSnackbar: () => {
      set({ snackbarOpen: false }, false, 'HIDE_SNACKBAR')
    }
  }
}, {
  name: 'common'
}))
