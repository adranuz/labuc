import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import dayjs, { Dayjs } from 'dayjs'

import { Container, FormControl, InputLabel, LinearProgress, MenuItem, Paper, Select, type SelectChangeEvent } from '@mui/material'

import { Toolbar } from '@/components/commons/Toolbar'
import { DatePicker } from '@mui/x-date-pickers'
import LoadingButton from '@mui/lab/LoadingButton'
import DownloadIcon from '@mui/icons-material/Download'

import { PacScoreReportTable } from './PacScoreReportTable'
import { usePacStore } from '@/store/pac'
import { API_URL } from '@/utils/constants'

export function PacScoreReport () {
  const [searchParams, setSearchParams] = useSearchParams()

  const [startDate, setStartDate] = useState<Dayjs | null>(searchParams.get('startDate') ? dayjs(searchParams.get('startDate')) : null)
  const [endDate, setEndDate] = useState<Dayjs | null>(searchParams.get('endDate') ? dayjs(searchParams.get('endDate')) : null)
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false)
  const [isLoadingDownloadReport, setIsLoadingDownloadReport] = useState(false)

  const customerId = searchParams.get('customerId') ?? undefined
  const [status, setStatus] = useState(searchParams.get('status') ?? undefined)


  const creditStatusList = [
    {
      id: 'accepted',
      name: 'Aceptado'
    },
    {
      id: 'notAccepted',
      name: 'No aceptado'
    }
  ]

  const [
    filters,
    setFilters,
    getScoreReportList,
    isLoading,
  ] = usePacStore((state) => [
    state.getScoreReportListFilters,
    state.setScoreReportListFilters,
    state.getScoreReportList,
    state.getScoreReportListLoading
  ])

  const handleDateStartChange = (value: Dayjs | null) => {
    setStartDate(value)
    if (value !== null) {
      searchParams.set('startDate', value.format('YYYY-MM-DD'))
    } else {
      searchParams.delete('startDate')
    }
    searchParams.set('page', '0')
    setSearchParams(searchParams)
    const newFilters = { ...filters, page: 0 }
    setFilters(newFilters)
    if (value && endDate && customerId) {
      getScoreReportList(customerId, status, value.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'))
    }
    if (value === null && endDate == null && customerId) {
      getScoreReportList(customerId, status)
    }
  }

  const handleDateEndChange = (value: Dayjs | null) => {
    setEndDate(value)
    if (value !== null) {
      searchParams.set('endDate', value.format('YYYY-MM-DD'))
    } else {
      searchParams.delete('endDate')
    }
    searchParams.set('page', '0')
    setSearchParams(searchParams)
    const newFilters = { ...filters, page: 0 }
    setFilters(newFilters)
    if (startDate && value && customerId) {
      getScoreReportList(customerId, status, startDate.format('YYYY-MM-DD'), value.format('YYYY-MM-DD'))
    }
    if (startDate === null && value == null && customerId) {
      getScoreReportList(customerId, status)
    }
  }

  const handleStatusChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    setStatus(value)
    console.log(value)
    searchParams.set('status', value)
    searchParams.set('page', '0')
    setSearchParams(searchParams)
    const newFilters = { ...filters, page: 0 }
    setFilters(newFilters)
    if (customerId) {
      getScoreReportList(customerId, value, startDate?.format('YYYY-MM-DD'), endDate?.format('YYYY-MM-DD'))
    }
  }

  const handleDownloadReportClick = () => {
    downloadReport(customerId, status, startDate?.format('YYYY-MM-DD'), endDate?.format('YYYY-MM-DD'))
  }

  const downloadReport = (customerId?: string, status?: string, startDate?: string, endDate?: string) => {
    setIsLoadingDownloadReport(true)

    const url = new URL(`${API_URL}/pac/customers/${customerId}/score/report/download`)

    const params = {}

    Object.assign(
      params,
      status && { status },
      (startDate && endDate) && { startDate, endDate },
    )

    url.search = new URLSearchParams(params).toString()

    let filename = ''

    fetch(url)
      .then(async res => {
        const header = res.headers.get('Content-Disposition')
        if (header) {
          const parts = header.split(';')
          filename = parts[1].split('=')[1].replaceAll('\"', '')
        }
        return await res.blob()
      })
      .then(blob => URL.createObjectURL(blob))
      .then((href) => {
        Object.assign(document.createElement('a'), {
          href,
          download: filename
        }).click()
      })
      .finally(() => {
        setIsLoadingDownloadReport(false)
      })
  }

  const getDisabledDatesForEndDate = (date) => {
    return date.isBefore(startDate)
  }

  useEffect(() => {
    if (customerId === undefined) return

    const perPage = searchParams.get('perPage')
    const page = searchParams.get('page')
    const q = searchParams.get('q')

    setFilters({
      perPage: perPage !== null ? parseInt(perPage) : 10,
      page: page !== null ? parseInt(page) : 0,
      q: q ? filters.q : ''
    })

    console.log('setSearchParams')
    console.log(searchParams.values())

    getScoreReportList(customerId, status, startDate?.format('YYYY-MM-DD'), endDate?.format('YYYY-MM-DD'))
  }, [])

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper variant='outlined' sx={{ width: '100%', mb: 2, pt: 1, position: 'relative' }}>
        <Toolbar
          title='Reporte de score PAC'
          pathRouteForBackButton={`/tool/pac/score?customerId=${customerId}`}
        >
          <DatePicker
            value={startDate}
            onChange={handleDateStartChange}
            label='Fecha de inicio'
            slotProps={{
              actionBar: {
                actions: ['clear']
              },
              textField: startDate === null && endDate !== null
                ? {
                  size: 'small',
                  error: true
                } : {
                  size: 'small',
                }
            }}
            disableFuture
            sx={{
              maxWidth: 180
            }}
            disabled={isLoading}
          />

          <DatePicker
            value={endDate}
            open={openEndDatePicker}
            onChange={handleDateEndChange}
            onClose={() => {
              setOpenEndDatePicker(false)
            }}
            onOpen={() => {
              setOpenEndDatePicker(true)
            }}
            label='Fecha de fin'
            slotProps={{
              actionBar: {
                actions: ['clear']
              },
              textField: startDate !== null && endDate === null
                ? {
                  size: 'small',
                  error: true
                } : {
                  size: 'small',
                }
            }}
            disableFuture
            shouldDisableDate={getDisabledDatesForEndDate}
            sx={{
              maxWidth: 180
            }}
            disabled={isLoading}
          />

          <FormControl
            margin='none'
            size='small'
            sx={{
              minWidth: 135,
            }}
            disabled={isLoading}
          >
            <InputLabel>Estado</InputLabel>
            <Select
              label='Estado'
              onChange={handleStatusChange}
              defaultValue={status}
            >
              <MenuItem value=''><em>Todos</em></MenuItem>
              {creditStatusList?.map(({ id, name }) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <LoadingButton
            size='small'
            color='primary'
            loadingPosition='start'
            startIcon={<DownloadIcon />}
            onClick={() => handleDownloadReportClick()}
            disabled={isLoading || isLoadingDownloadReport}
            loading={isLoadingDownloadReport}
          >
            Descargar (.csv)
          </LoadingButton>
        </Toolbar>

        {isLoading && (
          <LinearProgress
            sx={{ position: 'absolute', top: '0', left: 0, right: 0, borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          />
        )}

        <PacScoreReportTable
          customerId={customerId}
          status={status}
          startDate={startDate?.format('YYYY-MM-DD')}
          endDate={endDate?.format('YYYY-MM-DD')}
        />
      </Paper>
    </Container>
  )
}
