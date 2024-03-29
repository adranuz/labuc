import { useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'

import { Box, LinearProgress, Paper, Button } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'

import { BlockingDeviceListTable } from './BlockingDeviceListTable'
import { Toolbar } from '@/components/commons/Toolbar'
import { useBlockingStore } from '@/store/blocking'

export function BlockingDeviceList () {
  const [searchParams] = useSearchParams()

  const [
    filters,
    setFilters,
    getBlockingDeviceList,
    isLoading,
    blockingDeviceList
  ] = useBlockingStore((state) => [
    state.getBlockingDeviceListFilters,
    state.setBlockingDeviceListFilters,
    state.getBlockingDeviceList,
    state.getBlockingDeviceListLoading,
    state.blockingDeviceList
  ])

  useEffect(() => {
    const perPage = searchParams.get('perPage')
    const page = searchParams.get('page')
    const q = searchParams.get('q')

    setFilters({
      perPage: perPage !== null ? parseInt(perPage) : filters.perPage,
      page: page !== null ? parseInt(page) : filters.page,
      q: q ?? filters.q
    })

    getBlockingDeviceList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Paper variant='outlined' sx={{ width: '100%', mb: 2 }}>
        <Toolbar title='Reportes HB'>
          <Button
            size='small'
            color='primary'
            startIcon={<UploadIcon />}
            component={Link}
            to='/tool/blocking/reports/new'
          >
            Importar reporte
          </Button>
        </Toolbar>

        {isLoading && (
          <LinearProgress
            sx={{ position: 'absolute', top: '0', left: 0, right: 0, borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          />
        )}

        <BlockingDeviceListTable blockingDeviceList={blockingDeviceList} />
      </Paper>
    </Box>
  )
}
