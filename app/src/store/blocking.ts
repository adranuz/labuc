import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

import { API_URL } from '@/utils/constants'
import { type Filters } from '@/types/Filters'
import { type LogFile } from '@/types/LogFile'
import { type LogProcess } from '@/types/LogProcess'
import { type NuovoReport, type NuovoReports } from '@/types/NuovoReport'
import { useCommonStore } from '@/store/common'

interface State {
  nuovoReport: NuovoReport | undefined
  getNuovoReportLoading: boolean
  getNuovoReport: (id: string) => void

  nuovoReportList: NuovoReports | undefined
  getNuovoReportListLoading: boolean
  getNuovoReportListFilters: Filters
  setNuovoReportListFilters: (filters: Filters) => void
  getNuovoReportList: () => void

  nuovoReportLogFile: LogFile[]
  getNuovoReportLogFileLoading: boolean
  getNuovoReportLogFile: (id: string) => void

  nuovoReportLogProcess: LogProcess[]
  getNuovoReportLogProcessLoading: boolean
  getNuovoReportLogProcess: (id: string) => void

  buildNuovoReportConsolidatedLoading: boolean
  buildNuovoReportConsolidated: ({
    id,
    refreshNuovoReportOnSuccess,
    refreshNuovoReportListOnSuccess
  }: {
    id: string,
    refreshNuovoReportOnSuccess?: boolean,
    refreshNuovoReportListOnSuccess?: boolean
  }) => void
}

const showSnackbar = useCommonStore.getState().showSnackbar

export const useBlockingStore = create<State>()(devtools(persist((set, get) => {
  return {
    nuovoReport: undefined,
    getNuovoReportLoading: false,
    nuovoReportList: undefined,
    getNuovoReportListLoading: false,
    getNuovoReportListFilters: {
      perPage: 10,
      page: 0,
      q: ''
    },
    nuovoReportLogFile: [],
    getNuovoReportLogFileLoading: false,
    nuovoReportLogProcess: [],
    getNuovoReportLogProcessLoading: false,
    buildNuovoReportConsolidatedLoading: false,

    getNuovoReport: (id: string) => {
      set({ getNuovoReportLoading: true }, false, 'GET_NUOVO_REPORT_START')

      const url = new URL(`${API_URL}/blocking/reports/${id}`)

      fetch(url)
        .then(async res => await res.json())
        .then((data: NuovoReport) => {
          set({ nuovoReport: data, getNuovoReportLoading: false }, false, 'GET_NUOVO_REPORT_SUCCESS')
        })
    },

    setNuovoReportListFilters: (filters: Filters) => {
      set({ getNuovoReportListFilters: filters }, false, 'SET_NUOVO_REPORT_LIST_FILTERS')
    },

    getNuovoReportList: () => {
      set({ getNuovoReportListLoading: true }, false, 'GET_NUOVO_REPORT_LIST_START')

      const url = new URL(`${API_URL}/blocking/reports`)

      const { perPage, page, q } = get().getNuovoReportListFilters

      const params = {
        perPage: String(perPage),
        page: String(page),
        q
      }

      url.search = new URLSearchParams(params).toString()

      fetch(url)
        .then(async res => await res.json())
        .then((data: NuovoReports) => {
          set({ nuovoReportList: data, getNuovoReportListLoading: false }, false, 'GET_NUOVO_REPORT_LIST_SUCCESS')
        })
    },

    getNuovoReportLogFile: (id: string) => {
      set({ getNuovoReportLogFileLoading: true }, false, 'GET_NUOVO_REPORT_LOG_FILE_START')

      const url = new URL(`${API_URL}/blocking/reports/${id}/log`)

      const params = {
        type: 'file'
      }

      url.search = new URLSearchParams(params).toString()

      fetch(url)
        .then(async res => await res.json())
        .then((data: LogFile[]) => {
          set({ nuovoReportLogFile: data, getNuovoReportLogFileLoading: false }, false, 'GET_NUOVO_REPORT_LOG_FILE_SUCCESS')
        })
    },

    getNuovoReportLogProcess: (id: string) => {
      set({ getNuovoReportLogProcessLoading: true }, false, 'GET_NUOVO_REPORT_LOG_PROCESS_START')

      const url = new URL(`${API_URL}/blocking/reports/${id}/log`)

      const params = {
        type: 'process'
      }

      url.search = new URLSearchParams(params).toString()

      fetch(url)
        .then(async res => await res.json())
        .then((data: LogProcess[]) => {
          set({ nuovoReportLogProcess: data, getNuovoReportLogProcessLoading: false }, false, 'GET_NUOVO_REPORT_LOG_PROCESS_SUCCESS')
        })
    },

    buildNuovoReportConsolidated: ({
      id,
      refreshNuovoReportOnSuccess,
      refreshNuovoReportListOnSuccess
    }: {
      id: string,
      refreshNuovoReportOnSuccess?: boolean,
      refreshNuovoReportListOnSuccess?: boolean
    }) => {
      set({ buildNuovoReportConsolidatedLoading: true }, false, 'BUILD_NUOVO_REPORT_CONSOLIDATED_START')

      const url = new URL(`${API_URL}/blocking/reports/${id}/consolidated`)

      fetch(url, {
        method: 'POST'
      })
        .then(async res => await res.json())
        .then(() => {
          set({ buildNuovoReportConsolidatedLoading: false }, false, 'BUILD_NUOVO_REPORT_CONSOLIDATED_SUCCESS')
          showSnackbar('El consolidado se generó correctamente', 'success')
          if (refreshNuovoReportOnSuccess) {
            get().getNuovoReport(id)
            get().getNuovoReportLogFile(id)
            get().getNuovoReportLogProcess(id)
          }
          if (refreshNuovoReportListOnSuccess) {
            get().getNuovoReportList()
          }
        })
    }
  }
}, {
  name: 'blocking'
})))
