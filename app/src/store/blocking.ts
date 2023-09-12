import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

import { API_URL } from '@/utils/constants'
import { type Filters } from '@/types/Filters'
import { type LogFile } from '@/types/LogFile'
import { type LogProcess } from '@/types/LogProcess'
import { type BlockingDevice, type BlockingDevices } from '@/types/BlockingDevice'
import { useCommonStore } from '@/store/common'

interface State {
  blockingDevice: BlockingDevice | undefined
  getBlockingDeviceLoading: boolean
  getBlockingDevice: (id: string) => void

  blockingDeviceList: BlockingDevices | undefined
  getBlockingDeviceListLoading: boolean
  getBlockingDeviceListFilters: Filters
  setBlockingDeviceListFilters: (filters: Filters) => void
  getBlockingDeviceList: () => void

  blockingDeviceImportLogFile: LogFile[]
  getBlockingDeviceImportLogFileLoading: boolean
  getBlockingDeviceImportLogFile: (id: string) => void

  blockingDeviceImportLogProcess: LogProcess[]
  getBlockingDeviceImportLogProcessLoading: boolean
  getBlockingDeviceImportLogProcess: (id: string) => void

  buildBlockingDeviceConsolidatedReportLoading: boolean
  buildBlockingDeviceConsolidatedReport: ({
    id,
    refreshBlockingDeviceOnSuccess,
    refreshBlockingDeviceListOnSuccess
  }: {
    id: string,
    refreshBlockingDeviceOnSuccess?: boolean,
    refreshBlockingDeviceListOnSuccess?: boolean
  }) => void
}

const showSnackbar = useCommonStore.getState().showSnackbar

export const useBlockingStore = create<State>()(devtools(persist((set, get) => {
  return {
    blockingDevice: undefined,
    getBlockingDeviceLoading: false,
    blockingDeviceList: undefined,
    getBlockingDeviceListLoading: false,
    getBlockingDeviceListFilters: {
      perPage: 10,
      page: 0,
      q: ''
    },
    blockingDeviceImportLogFile: [],
    getBlockingDeviceImportLogFileLoading: false,
    blockingDeviceImportLogProcess: [],
    getBlockingDeviceImportLogProcessLoading: false,
    buildBlockingDeviceConsolidatedReportLoading: false,

    getBlockingDevice: (id: string) => {
      set({ getBlockingDeviceLoading: true }, false, 'GET_BLOCKING_DEVICE_START')

      const url = new URL(`${API_URL}/blocking/reports/${id}`)

      fetch(url)
        .then(async res => await res.json())
        .then((data: BlockingDevice) => {
          set({ blockingDevice: data, getBlockingDeviceLoading: false }, false, 'GET_BLOCKING_DEVICE_SUCCESS')
        })
    },

    setBlockingDeviceListFilters: (filters: Filters) => {
      set({ getBlockingDeviceListFilters: filters }, false, 'SET_BLOCKING_DEVICE_LIST_FILTERS')
    },

    getBlockingDeviceList: () => {
      set({ getBlockingDeviceListLoading: true }, false, 'GET_BLOCKING_DEVICE_LIST_START')

      const url = new URL(`${API_URL}/blocking/reports`)

      const { perPage, page, q } = get().getBlockingDeviceListFilters

      const params = {
        perPage: String(perPage),
        page: String(page),
        q
      }

      url.search = new URLSearchParams(params).toString()

      fetch(url)
        .then(async res => await res.json())
        .then((data: BlockingDevices) => {
          set({ blockingDeviceList: data, getBlockingDeviceListLoading: false }, false, 'GET_BLOCKING_DEVICE_LIST_SUCCESS')
        })
    },

    getBlockingDeviceImportLogFile: (id: string) => {
      set({ getBlockingDeviceImportLogFileLoading: true }, false, 'GET_BLOCKING_DEVICE_LOG_FILE_START')

      const url = new URL(`${API_URL}/blocking/reports/${id}/log`)

      const params = {
        type: 'file'
      }

      url.search = new URLSearchParams(params).toString()

      fetch(url)
        .then(async res => await res.json())
        .then((data: LogFile[]) => {
          set({ blockingDeviceImportLogFile: data, getBlockingDeviceImportLogFileLoading: false }, false, 'GET_BLOCKING_DEVICE_LOG_FILE_SUCCESS')
        })
    },

    getBlockingDeviceImportLogProcess: (id: string) => {
      set({ getBlockingDeviceImportLogProcessLoading: true }, false, 'GET_BLOCKING_DEVICE_LOG_PROCESS_START')

      const url = new URL(`${API_URL}/blocking/reports/${id}/log`)

      const params = {
        type: 'process'
      }

      url.search = new URLSearchParams(params).toString()

      fetch(url)
        .then(async res => await res.json())
        .then((data: LogProcess[]) => {
          set({ blockingDeviceImportLogProcess: data, getBlockingDeviceImportLogProcessLoading: false }, false, 'GET_BLOCKING_DEVICE_LOG_PROCESS_SUCCESS')
        })
    },

    buildBlockingDeviceConsolidatedReport: ({
      id,
      refreshBlockingDeviceOnSuccess,
      refreshBlockingDeviceListOnSuccess
    }: {
      id: string,
      refreshBlockingDeviceOnSuccess?: boolean,
      refreshBlockingDeviceListOnSuccess?: boolean
    }) => {
      set({ buildBlockingDeviceConsolidatedReportLoading: true }, false, 'BUILD_BLOCKING_DEVICE_CONSOLIDATED_START')

      const url = new URL(`${API_URL}/blocking/reports/${id}/consolidated`)

      fetch(url, {
        method: 'POST'
      })
        .then(async res => await res.json())
        .then(() => {
          set({ buildBlockingDeviceConsolidatedReportLoading: false }, false, 'BUILD_BLOCKING_DEVICE_CONSOLIDATED_SUCCESS')
          showSnackbar('El consolidado se generó correctamente', 'success')
          if (refreshBlockingDeviceOnSuccess) {
            get().getBlockingDevice(id)
            get().getBlockingDeviceImportLogFile(id)
            get().getBlockingDeviceImportLogProcess(id)
          }
          if (refreshBlockingDeviceListOnSuccess) {
            get().getBlockingDeviceList()
          }
        })
    }
  }
}, {
  name: 'blocking'
})))
