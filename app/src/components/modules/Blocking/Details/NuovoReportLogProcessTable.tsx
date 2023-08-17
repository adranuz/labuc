import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { BooleanIndicator } from '@/components/commons/BooleanIndicator'
import { getDifferenceInSeconds, prettySeconds } from '@/utils/utils'
import { type LogProcess } from '@/types/LogProcess'

interface Props {
  logProcess: LogProcess[]
}

export function NuovoReportLogProcessTable ({ logProcess }: Props) {
  return (
    <TableContainer>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nombre</TableCell>
            <TableCell align='right'>Duración</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logProcess?.map(({ name, createdAt, finishedAt }, index) => (
            <TableRow key={index} hover>
              <TableCell align='center' padding='checkbox'><BooleanIndicator value={Boolean(finishedAt)} /></TableCell>
              <TableCell>{name}</TableCell>
              <TableCell align='right'>{prettySeconds(getDifferenceInSeconds(createdAt, finishedAt))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
