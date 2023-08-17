import { useState } from 'react'

import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert, Typography, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import DeleteIcon from '@mui/icons-material/Delete'

import { useCommonStore } from '@/store/common'
import { API_URL } from '@/utils/constants'

export default function ConfirmCustomerDeletion ({ id, name, onFinished, disabled = false }) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const showSnackbar = useCommonStore((state) => state.showSnackbar)

  const handleClickOpen = (event: React.MouseEvent<unknown>) => {
    event.stopPropagation()
    event.preventDefault()
    setOpen(true)
  }

  const handleClose = (event: React.MouseEvent<unknown>) => {
    event.stopPropagation()
    event.preventDefault()
    setOpen(false)
  }

  const handleClickDelete = (event: React.MouseEvent<unknown>) => {
    event.stopPropagation()
    event.preventDefault()
    deleteCustomer({ id })
  }

  const deleteCustomer = ({ id }) => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/customers/${id}`)

    fetch(url, {
      method: 'DELETE'
    })
      .then(async res => await res.json())
      .then(_ => {
        showSnackbar('El cliente se eliminó corretamente', 'success')
        onFinished()
      })
      .catch(_ => showSnackbar('Error al intentar eliminar el cliente', 'error'))
      .finally(() => {
        setOpen(false)
        setIsLoading(false)
      })
  }

  return (
    <>
      <Button
        size='small'
        color='error'
        startIcon={<DeleteIcon />}
        onClick={(event) => handleClickOpen(event)}
        disabled={disabled}
      >
        Eliminar
      </Button>
      <Dialog
        fullWidth
        maxWidth='sm'
        open={open}
        onClose={(event: any) => handleClose(event)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Eliminar cliente
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <Alert severity='warning' color='error'>
              Depués de eliminar un cliente, este se borra de manera permanente.
              Esta acción no se puede deshacer.
            </Alert>
            <Box m={2}>
              <Typography variant='caption'>Nombre del cliente</Typography>
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
