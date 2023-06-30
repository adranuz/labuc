import { useEffect, useState } from 'react'

import { Box, Container, LinearProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import BuildIcon from '@mui/icons-material/Build';
import DownloadIcon from '@mui/icons-material/Download';

import apiUrl from '../../../config/api'

function ActivationReport () {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingBuildReport, setIsLoadingBuildReport] = useState(false)
  const [isLoadingDownloadActivationReport, setIsLoadingDownloadActivationReport] = useState(false)
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)
  const [data, setData] = useState<any>({})

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

  const buildReport = () => {
    setIsLoadingBuildReport(true)

    const url = new URL(`${apiUrl}/blocking/report`)

    fetch(url)
      .then(res => res.json())
      .then(() => {
        getActivationReport()
      })
      .finally(() => setIsLoadingBuildReport(false))
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
    buildReport()
  }

  const handleClickDownloadActivationReport = () => {
    downloadActivationReport()
  }

  const handleClickDownloadCustomerReport = (name: string, index: number) => {
    downloadCustomerReport(name, index)
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Paper variant='outlined'>
          <Toolbar>
            <Typography
              variant='h6'
              noWrap
              component='div'
              color='primary'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Consolidado
            </Typography>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              <LoadingButton
                size='small'
                color='primary'
                startIcon={<BuildIcon />}
                onClick={() => handleClickBuildReport()}
                disabled={data?.activationReport?.length !== 0}
                loading={isLoadingBuildReport}
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
                Decargar
              </LoadingButton>
            </Box>
          </Toolbar>

          { isLoading && (
            <LinearProgress
              sx={{ position: 'absolute', top: '0', left: 0, right: 0, borderRadius: 4, zIndex: 3 }}
            />
          ) }

          <TableContainer sx={{ maxHeight: 637 }}>
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
                          Reporte
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
        </Paper>
      </Box>
    </Container>
  )
}

export default ActivationReport
