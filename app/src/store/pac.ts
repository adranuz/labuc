import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { API_URL } from '@/utils/constants'
import { type Filters } from '@/types/Filters'
import { type CreditReports } from '@/types/CreditReport'
import { type ScoreReports } from '@/types/ScoreReport'

interface State {
  creditReportList: CreditReports | undefined
  getCreditReportListLoading: boolean
  getCreditReportListFilters: Filters
  setCreditReportListFilters: (filters: Filters) => void
  getCreditReportList: (id: string, status?: string, startDate?: string, endDate?: string) => void
  scoreReportList: ScoreReports | undefined
  getScoreReportListLoading: boolean
  getScoreReportListFilters: Filters
  setScoreReportListFilters: (filters: Filters) => void
  getScoreReportList: (id: string, status?: string, startDate?: string, endDate?: string) => void
}

export const usePacStore = create<State>()(devtools((set, get) => {
  return {
    creditReportList: undefined,
    getCreditReportListLoading: false,
    getCreditReportListFilters: {
      perPage: 10,
      page: 0,
      q: ''
    },
    scoreReportList: undefined,
    getScoreReportListLoading: false,
    getScoreReportListFilters: {
      perPage: 10,
      page: 0,
      q: ''
    },

    setCreditReportListFilters: (filters: Filters) => {
      set({ getCreditReportListFilters: filters }, false, 'SET_CREDIT_REPORT_LIST_FILTERS')
    },

    getCreditReportList: (id: string, status?: string, startDate?: string, endDate?: string) => {
      set({
        getCreditReportListLoading: true,
        creditReportList: undefined
      }, false, 'GET_CREDIT_REPORT_LIST_START')

      const url = new URL(`${API_URL}/pac/customers/${id}/credit/report`)

      const { perPage, page, q } = get().getCreditReportListFilters

      const params = {
        perPage: String(perPage),
        page: String(page)
      }

      Object.assign(
        params,
        q && { q },
        status && { status },
        (startDate && endDate) && { startDate, endDate },
      )

      url.search = new URLSearchParams(params).toString()

      fetch(url)
        .then(async res => await res.json())
        .then((data: CreditReports) => {
          set({ creditReportList: data, getCreditReportListLoading: false }, false, 'GET_CREDIT_REPORT_LIST_SUCCESS')
        })
    },

    setScoreReportListFilters: (filters: Filters) => {
      set({ getScoreReportListFilters: filters }, false, 'SET_SCORE_REPORT_LIST_FILTERS')
    },

    getScoreReportList: (id: string, status?: string, startDate?: string, endDate?: string) => {
      set({
        getScoreReportListLoading: true,
        scoreReportList: undefined
      }, false, 'GET_SCORE_REPORT_LIST_START')

      const url = new URL(`${API_URL}/pac/customers/${id}/score/report`)

      const { perPage, page, q } = get().getScoreReportListFilters

      const params = {
        perPage: String(perPage),
        page: String(page)
      }

      Object.assign(
        params,
        q && { q },
        status && { status },
        (startDate && endDate) && { startDate, endDate },
      )

      url.search = new URLSearchParams(params).toString()

      fetch(url)
        .then(async res => await res.json())
        .then((data: ScoreReports) => {
          set({ scoreReportList: data, getScoreReportListLoading: false }, false, 'GET_SCORE_REPORT_LIST_SUCCESS')
        })
    }
  }
}, {
  name: 'pac'
}))
