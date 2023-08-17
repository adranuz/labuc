import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Box, LinearProgress, Paper, Button } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'

import { NuovoReportListTable } from './NuovoReportListTable'
import { Toolbar } from '@/components/commons/Toolbar'
import { API_URL } from '@/utils/constants'
import { type NuovoReports } from '@/types/NuovoReport'
import { type Filters } from '@/types/Filters'
import { useCommonStore } from '@/store/common'

export function NuovoReportList () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const showSnackbar = useCommonStore((state) => state.showSnackbar)

  const [isLoading, setIsLoading] = useState(false)
  const [nuovoReports, setNuovoReports] = useState<NuovoReports | undefined>(undefined)

  const [filters, setFilters] = useState<Filters>({
    perPage: parseInt(searchParams.get('perPage') ?? '10'),
    page: parseInt(searchParams.get('page') ?? '0'),
    q: searchParams.get('q') ?? ''
  })

  useEffect(() => {
    getNuovoReports(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getNuovoReports = ({ perPage, page, q }: Filters) => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/blocking/reports`)

    const params = {
      perPage: String(perPage),
      page: String(page),
      q
    }

    url.search = new URLSearchParams(params).toString()

    fetch(url)
      .then(async res => await res.json())
      .then(data => {
        setNuovoReports(data)
      })
      .catch(_ => {
        showSnackbar('Error al obtener la información del consolidado', 'error')
      })
      .finally(() => setIsLoading(false))
  }

  const handleClickCreate = () => {
    navigate('/tool/blocking/reports/new')
  }

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Paper variant='outlined' sx={{ width: '100%', mb: 2 }}>
        <Toolbar title='Reportes HB'>
          <Button
            size='small'
            color='primary'
            startIcon={<UploadIcon />}
            onClick={() => handleClickCreate()}
          >
            Importar reporte
          </Button>
        </Toolbar>

        {isLoading && (
          <LinearProgress
            sx={{ position: 'absolute', top: '0', left: 0, right: 0, borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          />
        )}

        <NuovoReportListTable
          nuovoReports={nuovoReports}
          filters={filters}
          setFilters={setFilters}
          getNuovoReports={getNuovoReports}
        />
      </Paper>
    </Box>
  )
}
