import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Backdrop, Box, CircularProgress, Container, LinearProgress, Paper, Tab, Toolbar, Typography } from '@mui/material'
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab'
import BuildIcon from '@mui/icons-material/Build';
import DownloadIcon from '@mui/icons-material/Download';
import AndroidIcon from '@mui/icons-material/Android'
import AppleIcon from '@mui/icons-material/Apple'
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows'
import DevicesIcon from '@mui/icons-material/Devices'

import ActivationReportTable from './ActivationReportTable'
import apiUrl from '../../../config/api'
import { useCommonStore } from '../../../store/common'

function ActivationReport () {
  const showSnackbar = useCommonStore((state) => state.showSnackbar)
  const [searchParams, setSearchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCreateActivationReport, setIsLoadingCreateActivationReport] = useState(false)
  const [isLoadingDownloadActivationReport, setIsLoadingDownloadActivationReport] = useState(false)
  const [data, setData] = useState<any>({})

  const [tab, setTab] = useState(searchParams.get('tab') || 'all')

  const handleChangeTab = (_: React.SyntheticEvent, value: string) => {
    setTab(value)
    setSearchParams({
      tab: value,
    })
    getActivationReport(value)
  }

  useEffect(() => {
    getActivationReport(tab)
  }, [])

  const getActivationReport = (deviceType: string) => {
    setIsLoading(true)

    const url = new URL(`${apiUrl}/blocking/report/activation`)

    const params = {
      deviceType
    }

    url.search = new URLSearchParams(params).toString()

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
      .finally(() => setIsLoading(false))
  }

  const createActivationReport = () => {
    setIsLoadingCreateActivationReport(true)

    const url = new URL(`${apiUrl}/blocking/report/activation`)

    fetch(url, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(() => {
        getActivationReport(tab)
        showSnackbar('El consolidado se generó correctamente', 'success')
      })
      .finally(() => setIsLoadingCreateActivationReport(false))
  }

  const downloadActivationReport = (deviceType: string) => {
    setIsLoadingDownloadActivationReport(true)

    const url = new URL(`${apiUrl}/blocking/report/activation/download`)

    const params = {
      deviceType
    }

    url.search = new URLSearchParams(params).toString()

    let filename = ''

    fetch(url)
      .then(res => {
        const header = res.headers.get('Content-Disposition')
        if (header) {
          const parts = header.split(';')
          filename = parts[1].split('=')[1].replaceAll('\"', '')
        }
        return res.blob()
      })
      .then(blob => URL.createObjectURL(blob))
      .then((href) => {
        Object.assign(document.createElement('a'), {
          href,
          download: filename,
        }).click()
      })
      .finally(() => {
        setIsLoadingDownloadActivationReport(false)
      })
  }

  const handleClickBuildReport = () => {
    createActivationReport()
  }

  const handleClickDownloadActivationReport = () => {
    downloadActivationReport(tab)
  }

  const localeDate = (date: string) => {
    if (date)  return new Date(date).toLocaleString('es', {
      dateStyle: 'medium',
      timeStyle: 'short',
      hour12: true,
    })
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Toolbar disableGutters>
        <Typography
          component='h1'
          variant='h6'
          noWrap
          sx={{
            flexGrow: 1,
          }}
        >
          Consolidado {localeDate(data?.lastBlockingDeviceImport?.createdAt)}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2
          }}
        >
          <LoadingButton
            size='small'
            color='primary'
            loadingPosition='start'
            startIcon={<BuildIcon />}
            onClick={() => handleClickBuildReport()}
            disabled={data?.activationReport?.length !== 0}
            loading={isLoadingCreateActivationReport}
          >
            Generar
          </LoadingButton>
          <LoadingButton
            size='small'
            color='primary'
            loadingPosition='start'
            startIcon={<DownloadIcon />}
            onClick={() => handleClickDownloadActivationReport()}
            disabled={isLoading || data?.activationReport?.length === 0}
            loading={isLoadingDownloadActivationReport}
          >
            Descargar reporte (.xlsx)
          </LoadingButton>
        </Box>
      </Toolbar>

      <Paper variant='outlined' sx={{ position: 'relative' }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} indicatorColor='secondary'>
              <Tab icon={<DevicesIcon />} iconPosition='start' label='Todos' value='all' />
              <Tab icon={<AndroidIcon />} iconPosition='start' label='Android' value='android' />
              <Tab icon={<AppleIcon />} iconPosition='start' label='iOS' value='ios' />
              <Tab icon={<LaptopWindowsIcon />} iconPosition='start' label='Windows' value='windows' />
            </TabList>
          </Box>

          { isLoading && (
            <LinearProgress
              sx={{ position: 'absolute', top: '0', left: 0, right: 0, borderRadius: 4, zIndex: 3 }}
            />
          ) }

          <TabPanel value='all' sx={{ padding: 0 }}>
            <ActivationReportTable data={data} deviceType={tab} isLoading={isLoading} />
          </TabPanel>
          <TabPanel value='android' sx={{ padding: 0 }}>
            <ActivationReportTable data={data} deviceType={tab} isLoading={isLoading} />
          </TabPanel>
          <TabPanel value='ios' sx={{ padding: 0 }}>
            <ActivationReportTable data={data} deviceType={tab} isLoading={isLoading} />
          </TabPanel>
          <TabPanel value='windows' sx={{ padding: 0 }}>
            <ActivationReportTable data={data} deviceType={tab} isLoading={isLoading} />
          </TabPanel>
        </TabContext>
      </Paper>

      <Backdrop
        sx={{  color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoadingCreateActivationReport}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Container>
  )
}

export default ActivationReport
