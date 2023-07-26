import { useState } from 'react'

import { Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import DownloadIcon from '@mui/icons-material/Download'

import apiUrl from '../../../config/api'

function ActivationReportTable ({ data, deviceType, isLoading }) {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)

  const downloadCustomerReport = (deviceType: string, name: string, index: number) => {
    setSelectedRowIndex(index)

    const url = new URL(`${apiUrl}/blocking/report/customer/download`)

    const params = {
      deviceType,
      name
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
        setSelectedRowIndex(null)
      })
  }

  const handleClickDownloadCustomerReport = (name: string, index: number) => {
    downloadCustomerReport(deviceType, name, index)
  }

  return (
    <TableContainer sx={{ maxHeight: 551 }}>
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell align='right'>Facturables</TableCell>
            <TableCell align='right'>No Facturables</TableCell>
            <TableCell align='right'>APS</TableCell>
            <TableCell align='right'>APQ</TableCell>
            <TableCell align='right'>SKU Start</TableCell>
            <TableCell align='right'>SKU End</TableCell>
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
              <TableCell align='right'>
                {
                  row?._sum?.skuStartCounter >= 0
                    ? row?._sum?.skuStartCounter
                    : 0
                }
              </TableCell>
              <TableCell align='right'>
                {
                  row?._sum?.skuEndCounter >= 0
                    ? row?._sum?.skuEndCounter
                    : 0
                }
              </TableCell>
              <TableCell>
                <Stack direction='row' spacing={1} justifyContent='flex-end'>
                  <LoadingButton
                    size='small'
                    color='primary'
                    loadingPosition='start'
                    startIcon={<DownloadIcon />}
                    onClick={() => handleClickDownloadCustomerReport(row?.customerName, index)}
                    disabled={selectedRowIndex !== null || isLoading}
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
            position: 'sticky'
          }}
        >
          <TableRow>
            <TableCell colSpan={8} sx={{ padding: 0 }} />
          </TableRow>

          <TableRow>
            <TableCell variant='head'>Totales</TableCell>
            <TableCell align='right' variant='head'>{data?.activationReportTotals?._sum?.billable}</TableCell>
            <TableCell align='right' variant='head'>{data?.activationReportTotals?._sum?.nonBillable}</TableCell>
            <TableCell align='right' variant='head'>{data?.activationReportTotals?._sum?.billableWeekly}</TableCell>
            <TableCell align='right' variant='head'>{data?.activationReportTotals?._sum?.billableBiweekly}</TableCell>
            <TableCell align='right' variant='head'>{data?.skuReportTotals?._sum?.skuStartCounter}</TableCell>
            <TableCell align='right' variant='head'>{data?.skuReportTotals?._sum?.skuEndCounter}</TableCell>
            <TableCell align='right' variant='head' />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default ActivationReportTable
