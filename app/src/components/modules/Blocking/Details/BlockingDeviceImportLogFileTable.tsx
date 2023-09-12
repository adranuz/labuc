import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { prettyBytes } from '@/utils/utils'
import { type LogFile } from '@/types/LogFile'

interface Props {
  logFile: LogFile[]
}

export function BlockingDeviceImportLogFileTable ({ logFile }: Props) {
  return (
    <TableContainer sx={{ maxHeight: 475 }}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell align='right'>Tamaño</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logFile?.map(({ originalName, mimeType, size }, index) => (
            <TableRow key={index} hover>
              <TableCell>{originalName}</TableCell>
              <TableCell>{mimeType.split('/')[1]}</TableCell>
              <TableCell align='right'>{prettyBytes(size)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
