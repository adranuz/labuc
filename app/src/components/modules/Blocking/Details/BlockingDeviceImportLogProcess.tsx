import { useEffect } from 'react'

import { Paper } from '@mui/material'

import { Toolbar } from '@/components/commons/Toolbar'
import { BlockingDeviceImportLogProcessTable } from './BlockingDeviceImportLogProcessTable'
import { LoadingContent } from '@/components/commons/LoadingContent'
import { useBlockingStore } from '@/store/blocking'

interface Props {
  id: string
}

export function BlockingDeviceImportLogProcess ({ id }: Props) {
  const [
    getBlockingDeviceImportLogProcess,
    isLoading,
    logProcess
  ] = useBlockingStore((state) => [
    state.getBlockingDeviceImportLogProcess,
    state.getBlockingDeviceImportLogProcessLoading,
    state.blockingDeviceImportLogProcess
  ])

  useEffect(() => {
    getBlockingDeviceImportLogProcess(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Paper variant='outlined' sx={{ width: '100%', mb: 2 }}>
      <Toolbar title='Log de procesos' />
      <LoadingContent show={isLoading} />
      {!isLoading && <BlockingDeviceImportLogProcessTable logProcess={logProcess} />}
    </Paper>
  )
}
