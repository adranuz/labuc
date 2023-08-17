import { Tooltip } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  value: boolean
}

export function BooleanIndicator ({ value }: Props) {
  return (
    <Tooltip title={value ? 'Si' : 'No'} arrow>
      {
        value
          ? <CheckIcon color='success' />
          : <CloseIcon color='error' />
      }
    </Tooltip>
  )
}
