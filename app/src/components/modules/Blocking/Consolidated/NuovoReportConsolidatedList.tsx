import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import dayjs from 'dayjs'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Box, Container, FormControl, InputLabel, LinearProgress, MenuItem, Paper, Select, type SelectChangeEvent } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import DownloadIcon from '@mui/icons-material/Download'

import { Toolbar } from '@/components/commons/Toolbar'
import NuovoReportConsolidatedTable from './NuovoReportConsolidatedTable'
import { API_URL } from '@/utils/constants'

export function NuovoReportConsolidatedList () {
  const [searchParams, setSearchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingReportList, setIsLoadingReportList] = useState(false)
  const [isLoadingDownloadNuovoReportConsolidated, setIsLoadingDownloadNuovoReportConsolidated] = useState(false)
  const [data, setData] = useState<any>({})
  const [reportList, setReportList] = useState<any>({})
  const [selectedReport, setSelectedReport] = useState<any>({})

  const [device, setDevice] = useState(searchParams.get('device') ?? 'all')

  const handleDeviceChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    setDevice(value)
    setSearchParams({
      reportedAt: selectedReport.reportedAt?.slice(0, 10),
      device: value
    })
    getNuovoReportConsolidated(selectedReport.id, value)
  }

  const handleChangeSelectedReport = (value: string) => {
    const selectedDate = dayjs(value).format('YYYY-MM-DD')
    const foundReport = reportList?.data?.find(item => item.reportedAt?.slice(0, 10) === selectedDate)
    if (foundReport) {
      setSelectedReport(foundReport)
      getNuovoReportConsolidated(foundReport.id, device)
      setSearchParams({
        reportedAt: selectedDate,
        device
      })
    }
  }

  useEffect(() => {
    getReportList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getReportList = () => {
    setIsLoadingReportList(true)

    const url = new URL(`${API_URL}/blocking/reports`)

    const params = [
      ['pagination', 'false'],
      ['includeConsolidated', 'false'],
      ['fields[]', 'id'],
      ['fields[]', 'reportedAt']
    ]

    url.search = new URLSearchParams(params).toString()

    fetch(url)
      .then(async res => await res.json())
      .then(data => {
        setReportList(data)
        const reportedAt = searchParams.get('reportedAt')
        const foundReport = data?.data?.find(
          item => reportedAt === null
            ? item?.reportedAt !== null
            : item?.reportedAt?.startsWith(reportedAt)
        )
        if (foundReport) {
          setSelectedReport(foundReport)
          getNuovoReportConsolidated(foundReport.id, device)
        }
      })
      .finally(() => {
        setIsLoadingReportList(false)
      })
  }

  const getNuovoReportConsolidated = (id: string, deviceType: string) => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/blocking/reports/${id}/consolidated`)

    const params = {
      deviceType
    }

    url.search = new URLSearchParams(params).toString()

    fetch(url)
      .then(async res => await res.json())
      .then(data => {
        setData(data)
      })
      .finally(() => setIsLoading(false))
  }

  const downloadNuovoReportConsolidated = (id: string, deviceType: string) => {
    setIsLoadingDownloadNuovoReportConsolidated(true)

    const url = new URL(`${API_URL}/blocking/reports/${id}/consolidated/download`)

    const params = {
      deviceType
    }

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
        setIsLoadingDownloadNuovoReportConsolidated(false)
      })
  }

  const handleClickDownloadNuovoReportConsolidated = () => {
    downloadNuovoReportConsolidated(selectedReport?.id, device)
  }

  const getDisabledDates = (date) => {
    const currentDate = date.toISOString().slice(0, 10)
    const existsDate: boolean = reportList?.data?.some(item => item.reportedAt?.slice(0, 10) === currentDate)
    return !existsDate
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Paper variant='outlined' sx={{ width: '100%', mb: 2, pt: 1 }}>

          <Toolbar title='Consolidado'>
            <DatePicker
              value={selectedReport?.reportedAt && dayjs(selectedReport.reportedAt.slice(0, 10))}
              label='Fecha del reporte'
              slotProps={{
                textField: {
                  size: 'small'
                }
              }}
              shouldDisableDate={getDisabledDates}
              onChange={handleChangeSelectedReport}
              sx={{
                maxWidth: 190
              }}
            />
            <FormControl
              margin='none'
              size='small'
              sx={{
                minWidth: 120
              }}
            >
              <InputLabel>Dispositivos</InputLabel>
              <Select
                label='Dispositivos'
                defaultValue='all'
                onChange={handleDeviceChange}
              >
                <MenuItem value='all'>Todos</MenuItem>
                <MenuItem value='android'>Android</MenuItem>
                <MenuItem value='ios'>iOS</MenuItem>
                <MenuItem value='windows'>Windows</MenuItem>
              </Select>
            </FormControl>
            <LoadingButton
              size='small'
              color='primary'
              loadingPosition='start'
              startIcon={<DownloadIcon />}
              onClick={() => handleClickDownloadNuovoReportConsolidated()}
              disabled={isLoading || isLoadingReportList || data?.nuovoReportConsolidated?.length === 0}
              loading={isLoadingDownloadNuovoReportConsolidated}
            >
              Descargar reporte (.xlsx)
            </LoadingButton>
          </Toolbar>

          {(isLoading || isLoadingReportList) && (
            <LinearProgress
              sx={{ position: 'absolute', top: '0', left: 0, right: 0, borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
            />
          )}

          <NuovoReportConsolidatedTable
            id={selectedReport.id}
            data={data}
            deviceType={device}
          />
        </Paper>
      </Box>
    </Container>
  )
}
