import { useEffect } from 'react'

import { Paper } from '@mui/material'

import { LoadingContent } from '@/components/commons/LoadingContent'
import { BlockingDeviceDetailsTable } from './BlockingDeviceDetailsTable'
import { useBlockingStore } from '@/store/blocking'

interface Props {
  id: string
}

export function BlockingDeviceDetails ({ id }: Props) {
  const [
    getBlockingDevice,
    isLoading,
    blockingDevice
  ] = useBlockingStore((state) => [
    state.getBlockingDevice,
    state.getBlockingDeviceLoading,
    state.blockingDevice
  ])

  useEffect(() => {
    getBlockingDevice(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Paper variant='outlined' sx={{ width: '100%', mb: 2 }}>
      <LoadingContent show={isLoading} />
      {!isLoading && <BlockingDeviceDetailsTable blockingDevice={blockingDevice} />}
    </Paper>
  )
}
