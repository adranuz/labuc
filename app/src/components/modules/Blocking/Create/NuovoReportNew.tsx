
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import dayjs, { Dayjs } from 'dayjs'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { MuiFileInput } from 'mui-file-input'
import { Container, Card, CardContent, Switch, FormControlLabel, Grid, FormLabel, FormControl, Alert, Backdrop, CircularProgress } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import UploadIcon from '@mui/icons-material/Upload'

import { useCommonStore } from '@/store/common'
import { API_URL } from '@/utils/constants'
import { Toolbar } from '@/components/commons/Toolbar'

export function NuovoReportNew () {
  const navigate = useNavigate()
  const showSnackbar = useCommonStore((state) => state.showSnackbar)

  const [files, setFiles] = useState<File | File[]>([])
  const [truncate, setTruncate] = useState(true)
  const [reportedAt, setReportedAt] = useState<Dayjs | null>(dayjs())
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeFiles = (newFiles: File | File[]) => {
    setError(false)
    setFiles(newFiles)
  }

  const handleChangeTruncate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setTruncate(event.target.checked)
  }

  const handleChangeReportedAt = (value: Dayjs | null) => {
    setError(false)
    setReportedAt(value)
  }

  const handleSubmit = () => {
    if (files?.length > 0) uploadFiles(files)
  }

  const uploadFiles = (files) => {
    if (reportedAt === null) return

    setIsLoading(true)
    setError(false)

    const url = new URL(`${API_URL}/blocking/reports`)

    const data = new FormData()

    data.append('truncate', String(truncate))
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <DatePicker
                value={reportedAt}
                label='Fecha del reporte'
                slotProps={{
                  textField: {
                    margin: 'normal',
                    required: true,
                    fullWidth: true,
                    size: 'small'
                  }
                }}
                disableFuture
                onChange={handleChangeReportedAt}
              />
            </Grid>
            <Grid item xs={12} md={4}>
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
              />
            </Grid>
          </Grid>
          <FormControl variant='standard' sx={{ m: 1.5 }} required>
            <FormLabel>Restablecer tablas</FormLabel>
            <FormControlLabel
              control={
                <Switch
                  color='secondary'
                  checked={truncate}
                  onChange={handleChangeTruncate}
                  disabled={isLoading}
                />
              }
              label='Habilitar'
            />
          </FormControl>
          {!truncate && (
            <Alert severity='warning'>
              Si inhabilitas el restablecer tablas, podrías causar que la importación falle cuando encuentre que un deviceId fue previamente importado.
            </Alert>
          )}
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
