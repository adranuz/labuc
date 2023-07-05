import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Box, Button, Container, IconButton, LinearProgress, Paper, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab'
import BuildIcon from '@mui/icons-material/Build';
import DownloadIcon from '@mui/icons-material/Download';
import AndroidIcon from '@mui/icons-material/Android'
import AppleIcon from '@mui/icons-material/Apple'
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows'
import DevicesIcon from '@mui/icons-material/Devices'

import apiUrl from '../../../config/api'
import { useCommonStore } from '../../../store/common'

function ActivationReport () {
  const showSnackbar = useCommonStore((state) => state.showSnackbar)
  const [searchParams, setSearchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCreateActivationReport, setIsLoadingCreateActivationReport] = useState(false)
  const [isLoadingDownloadActivationReport, setIsLoadingDownloadActivationReport] = useState(false)
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)
  const [data, setData] = useState<any>({})

  const [tab, setTab] = useState(searchParams.get('tab') || 'all')

  const handleChangeTab = (_: React.SyntheticEvent, value: string) => {
    setTab(value)
    setSearchParams({
      tab: value,
    })
    getActivationReport()
  }

  useEffect(() => {
    getActivationReport()
  }, [])

  const getActivationReport = () => {
    setIsLoading(true)

    const url = new URL(`${apiUrl}/blocking/report/activation`)

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
        getActivationReport()
        showSnackbar('El consolidado se generó correctamente', 'success')
      })
      .finally(() => setIsLoadingCreateActivationReport(false))
  }

  const downloadActivationReport = () => {
    setIsLoadingDownloadActivationReport(true)

    const url = new URL(`${apiUrl}/blocking/report/activation/download`)

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

  const downloadCustomerReport = (name: string, index: number) => {
    setIsLoading(true)
    setSelectedRowIndex(index)

    const url = new URL(`${apiUrl}/blocking/report/customers`)

    const params = {
      name
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
        setSelectedRowIndex(null)
        setIsLoading(false)
      })
  }

  const handleClickBuildReport = () => {
    createActivationReport()
  }

  const handleClickDownloadActivationReport = () => {
    downloadActivationReport()
  }

  const handleClickDownloadCustomerReport = (name: string, index: number) => {
    downloadCustomerReport(name, index)
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
          Consolidado
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
              <Tab icon={<AndroidIcon />} iconPosition='start' label='Android' value='android' disabled />
              <Tab icon={<AppleIcon />} iconPosition='start' label='iOS' value='ios' disabled />
              <Tab icon={<LaptopWindowsIcon />} iconPosition='start' label='Windows' value='windows' disabled />
            </TabList>
          </Box>
          <TabPanel value='all' sx={{ padding: 0 }}>
            { isLoading && (
              <LinearProgress
                sx={{ position: 'absolute', top: '0', left: 0, right: 0, borderRadius: 4, zIndex: 3 }}
              />
            ) }

            <TableContainer sx={{ maxHeight: 551 }}>
              <Table stickyHeader size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Cliente</TableCell>
                    <TableCell align='right'>Facturables</TableCell>
                    <TableCell align='right'>No Facturables</TableCell>
                    <TableCell align='right'>APS</TableCell>
                    <TableCell align='right'>APQ</TableCell>
                    <TableCell align='right'>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.activationReport?.map((row, index) => (
                    <TableRow key={row?.customerName}>
                      <TableCell component='th' scope='row'>{row?.customerName}</TableCell>
                      <TableCell align='right'>{row?._sum?.billable}</TableCell>
                      <TableCell align='right'>{row?._sum?.nonBillable}</TableCell>
                      <TableCell align='right'>{row?._sum?.billableWeekly}</TableCell>
                      <TableCell align='right'>{row?._sum?.billableBiweekly}</TableCell>
                      <TableCell>
                        <Stack direction='row' spacing={1} justifyContent='flex-end'>
                          <LoadingButton
                            size='small'
                            color='primary'
                            startIcon={<DownloadIcon />}
                            onClick={() => handleClickDownloadCustomerReport(row?.customerName, index)}
                            disabled={isLoading}
                            loading={selectedRowIndex === index}
                          >
                            Exportar (.csv)
                          </LoadingButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter
                  sx={{
                    left: 0,
                    bottom: 0,
                    zIndex: 2,
                    position: 'sticky',
                  }}
                >
                  <TableRow sx={{backgroundColor: 'white'}}>
                    <TableCell colSpan={6} sx={{padding: 0}}></TableCell>
                  </TableRow>

                  <TableRow sx={{backgroundColor: 'white'}}>
                    <TableCell variant='head'>Totales</TableCell>
                    <TableCell align='right' variant='head'>{data?.activationReportTotals?._sum?.billable}</TableCell>
                    <TableCell align='right' variant='head'>{data?.activationReportTotals?._sum?.nonBillable}</TableCell>
                    <TableCell align='right' variant='head'>{data?.activationReportTotals?._sum?.billableWeekly}</TableCell>
                    <TableCell align='right' variant='head'>{data?.activationReportTotals?._sum?.billableBiweekly}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
              </TableFooter>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value='android'>
          </TabPanel>
          <TabPanel value='ios'>
          </TabPanel>
          <TabPanel value='windows'>
          </TabPanel>
        </TabContext>
      </Paper>
    </Container>
  )
}

export default ActivationReport
