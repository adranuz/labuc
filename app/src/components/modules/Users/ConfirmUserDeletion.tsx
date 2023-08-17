import { useState } from 'react'

import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert, Typography, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import DeleteIcon from '@mui/icons-material/Delete'

import { useCommonStore } from '@/store/common'
import { API_URL } from '@/utils/constants'

export default function ConfirmUserDeletion ({ id, name, onFinished }) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const showSnackbar = useCommonStore((state) => state.showSnackbar)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickDelete = () => {
    deleteUser({ id })
  }

  const deleteUser = ({ id }) => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/users/${id}`)

    fetch(url, {
      method: 'DELETE'
    })
      .then(async res => await res.json())
      .then(_ => {
        showSnackbar('El usuario se eliminó corretamente', 'success')
        onFinished()
      })
      .catch(_ => showSnackbar('Error al intentar eliminar el usuario', 'error'))
      .finally(() => {
        setOpen(false)
        setIsLoading(false)
      })
  }

  const getAuthenticatedUser = () => {
    const token = localStorage.getItem('token')
    if (!token) return
    return decodeJwt(token)
  }

  const decodeJwt = (jwt: string) => {
    return JSON.parse(decodeURIComponent(escape(atob(jwt.split('.')[1]))))
  }

  return (
    <>
      <Button
        size='small'
        color='error'
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
        disabled={id === getAuthenticatedUser()?.id}
      >
        Eliminar
      </Button>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Eliminar usuario
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Alert severity='error'>
              Depués de eliminar un usuario, este se borra de manera permanente.
              Esta acción no se puede deshacer.
            </Alert>
            <Box m={2}>
              <Typography variant='caption'>Nombre del usuario</Typography>
              <Typography mt={1} color='black'>{name}</Typography>
            </Box>
          </DialogContentText>
          <DialogActions>
            <Button size='small' onClick={handleClose}>Cancelar</Button>
            <LoadingButton
              loading={isLoading}
              variant='contained'
              color='error'
              size='small'
              loadingPosition='start'
              disableElevation
              autoFocus
              onClick={handleClickDelete}
            >
              Eliminar
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
