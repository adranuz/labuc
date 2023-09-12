
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import dayjs, { Dayjs } from 'dayjs'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { MuiFileInput } from 'mui-file-input'
import { Container, Card, CardContent, Stack, Alert, Backdrop, CircularProgress } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import UploadIcon from '@mui/icons-material/Upload'

import { useCommonStore } from '@/store/common'
import { API_URL } from '@/utils/constants'
import { Toolbar } from '@/components/commons/Toolbar'

export function BlockingDeviceNew () {
  const navigate = useNavigate()
  const showSnackbar = useCommonStore((state) => state.showSnackbar)

  const [files, setFiles] = useState<File | File[]>([])
  const [reportedAt, setReportedAt] = useState<Dayjs | null>(dayjs())
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeFiles = (newFiles: File | File[]) => {
    setError(false)
    setFiles(newFiles)
  }

  const handleChangeReportedAt = (value: Dayjs | null) => {
    setError(false)
    setReportedAt(value)
  }

  const handleSubmit = () => {
    if (Array.isArray(files) && files.length > 0) uploadFiles(files)
  }

  const uploadFiles = (files) => {
    if (reportedAt === null) return

    setIsLoading(true)
    setError(false)

    const url = new URL(`${API_URL}/blocking/reports`)

    const data = new FormData()

    data.append('reportedAt', reportedAt.format('YYYY-MM-DD'))

    for (const file of files) {
      data.append('files', file, file.name)
    }

    fetch(url, {
      method: 'POST',
      body: data
    })
      .then(async (res) => {
        if (!res.ok) {
          setError(true)
          return
        }

        return await res.json()
      })
      .then(data => {
        toImports(data.id)
        showSnackbar('La importación se completó correctamente', 'success')
      })
      .catch(_ => setError(true))
      .finally(() => setIsLoading(false))
  }

  const toImports = (id: string) => {
    navigate({
      pathname: '/tool/blocking/reports',
      search: `?selected=${id}`
    })
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Toolbar
        title='Importar Reporte'
        pathRouteForBackButton='/tool/blocking/reports'
        disableGutters
      >
        <LoadingButton
          loading={isLoading}
          variant='contained'
          loadingPosition='start'
          size='small'
          disableElevation
          startIcon={<UploadIcon />}
          onClick={handleSubmit}
        >
          Importar
        </LoadingButton>
      </Toolbar>

      <Card variant='outlined'>
        <CardContent>
          {error && (
            <Alert severity='error' sx={{ marginBottom: 1 }}>
              La importación falló. Intentelo nuevamente.
            </Alert>
          )}
          <Stack direction='column'>
            <DatePicker
              value={reportedAt}
              label='Fecha del reporte'
              slotProps={{
                textField: {
                  margin: 'normal',
                  required: true,
                  size: 'small'
                }
              }}
              disableFuture
              onChange={handleChangeReportedAt}
              sx={{
                maxWidth: 320
              }}
            />
            <MuiFileInput
              label='Archivos (.csv)'
              size='small'
              margin='normal'
              required
              fullWidth
              multiple
              value={files}
              onChange={handleChangeFiles}
              inputProps={{ accept: '.csv' }}
              disabled={isLoading}
              sx={{
                maxWidth: 320
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Container>
  )
}
