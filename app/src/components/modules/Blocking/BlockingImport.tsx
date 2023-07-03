
import { useState } from 'react'

import { MuiFileInput } from 'mui-file-input'
import { Container, Card, CardContent, CardHeader, CardActions, Switch, FormControlLabel, Grid, FormLabel, FormControl, Alert } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import apiUrl from '../../../config/api'

function BlockingImport () {
  const [files, setFiles] = useState<File | File[]>([])
  const [truncate, setTruncate] = useState(true)
  const [successful, setSuccessful] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeFiles = (newFiles: File | File[]) => {
    setSuccessful(false)
    setFiles(newFiles)
    console.log(newFiles)
  }

  const handleChangeTruncate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuccessful(false)
    setTruncate(event.target.checked)
  }

  const handleClickContinue = () => {
    uploadFiles(files)
  }

  const uploadFiles = (files) => {
    setIsLoading(true)
    setSuccessful(false)

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
    .then(_ => {})
    .catch(_ => {})
    .finally(() => {
      setSuccessful(true)
      setIsLoading(false)
    })
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Card variant='outlined'>
        <CardHeader title='Importar datos' />
        <CardContent>
          {successful && (
            <Alert severity='success' sx={{marginBottom: 1}}>
              La importación se ha completado correctamente.
            </Alert>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            <MuiFileInput
              label='Archivos'
              size='small'
              margin='normal'
              multiple
              value={files}
              onChange={handleChangeFiles}
              inputProps={{ accept: '.csv' }}
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
                />
              }
              label='Habilitar'
            />
          </FormControl>
          {!truncate && (
            <Alert severity='warning' color='error'>
              Si inhabilitas el restablecer tablas, podrías causar que la importación falle cuando encuentre que un deviceId fue previamente importado.
            </Alert>
          )}
        </CardContent>
        <CardActions>
            <LoadingButton
              loading={isLoading}
              variant='contained'
              size='small'
              disableElevation
              onClick={handleClickContinue}
            >
              Continuar
            </LoadingButton>
          </CardActions>
      </Card>
    </Container>
  )
}

export default BlockingImport
