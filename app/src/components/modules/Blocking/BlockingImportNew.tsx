
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { MuiFileInput } from 'mui-file-input'
import { Container, Card, CardContent, Switch, FormControlLabel, Grid, FormLabel, FormControl, Alert, Box, IconButton, Toolbar, Typography, Backdrop, CircularProgress } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import UploadIcon from '@mui/icons-material/Upload'

import { useCommonStore } from '../../../store/common'
import apiUrl from '../../../config/api'

function BlockingImportNew () {
  const navigate = useNavigate()
  const showSnackbar = useCommonStore((state) => state.showSnackbar)

  const [files, setFiles] = useState<File | File[]>([])
  const [truncate, setTruncate] = useState(true)
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

  const handleSubmit = () => {
    if (files?.length > 0) uploadFiles(files)
  }

  const uploadFiles = (files) => {
    setIsLoading(true)
    setError(false)

    const url = new URL(`${apiUrl}/blocking/import`)

    const data = new FormData()

    data.append('truncate', String(truncate))

    for (const file of files) {
      data.append('files', file, file.name)
    }
    
    fetch(url, {
      method: 'POST',
      body: data
    })
    .then((res) => {
      if (!res.ok) {
          setError(true)
          return
      }
      
      return res.json()
  })
    .then(data => {
      toImports(data.id)
      showSnackbar('La importación se completó correctamente', 'success')
    })
    .catch(_ => setError(true))
    .finally(() => setIsLoading(false))
  }

  const handleClickBack = () => {
    toImports()
  }

  const toImports = (id?: string) => {
    navigate({
      pathname: '/tool/blocking/imports',
      search: `?selected=${id}`,
    })
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Toolbar disableGutters>
        <IconButton
            size='large'
            color='inherit'
            sx={{ mr: 2 }}
            onClick={handleClickBack}
          >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          component='h1'
          variant='h6'
          noWrap
          sx={{
            flexGrow: 1,
          }}
        >
          Nueva importación
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2
          }}
        >
          <LoadingButton
            loading={isLoading}
            variant='contained'
            size='small'
            disableElevation
            startIcon={<UploadIcon />}
            onClick={handleSubmit}
          >
            Importar
          </LoadingButton>
        </Box>
      </Toolbar>

      <Card variant='outlined'>
        <CardContent>
          {error && (
            <Alert severity='error' sx={{marginBottom: 1}}>
              La importación falló. Intentelo nuevamente.
            </Alert>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MuiFileInput
                label='Archivos (.csv)'
                size='small'
                margin='normal'
                multiple
                value={files}
                onChange={handleChangeFiles}
                inputProps={{ accept: '.csv' }}
                disabled={isLoading}
              />
            </Grid>
          </Grid>
          <FormControl sx={{ m: 1.5 }} variant='standard'>
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
        sx={{  color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </Container>
  )
}

export default BlockingImportNew
