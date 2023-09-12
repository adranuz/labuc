import { useEffect } from 'react'

import { Paper } from '@mui/material'

import { Toolbar } from '@/components/commons/Toolbar'
import { BlockingDeviceImportLogFileTable } from './BlockingDeviceImportLogFileTable'
import { LoadingContent } from '@/components/commons/LoadingContent'
import { useBlockingStore } from '@/store/blocking'

interface Props {
  id: string
}

export function BlockingDeviceImportLogFile ({ id }: Props) {
  const [
    getBlockingDeviceImportLogFile,
    isLoading,
    logFile
  ] = useBlockingStore((state) => [
    state.getBlockingDeviceImportLogFile,
    state.getBlockingDeviceImportLogFileLoading,
    state.blockingDeviceImportLogFile
  ])

  useEffect(() => {
    getBlockingDeviceImportLogFile(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Paper variant='outlined' sx={{ width: '100%', mb: 2 }}>
      <Toolbar title='Log de archivos' />
      <LoadingContent show={isLoading} />
      {!isLoading && <BlockingDeviceImportLogFileTable logFile={logFile} />}
    </Paper>
  )
}
