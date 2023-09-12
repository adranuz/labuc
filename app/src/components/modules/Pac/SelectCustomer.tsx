import { useEffect, useState } from 'react'

import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material'

import { API_URL } from '@/utils/constants'

interface Customer {
  id: string
  name: string
}

interface Props {
  onChange: (customer: Customer) => void,
  defaultCustomerId: string | null,
  hasProducts: string[]
}

export function SelectCustomer ({ onChange, defaultCustomerId, hasProducts }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [customersList, setCustomersList] = useState<any[]>([])

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    const customer = customersList?.find((customer: Customer) => customer.id === value)
    const { id, name } = customer
    onChange({ id, name })
  }

  useEffect(() => {
    getCustomerList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCustomerList = () => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/customers`)

    const params = [
      ['pagination', 'false'],
      ['fields[]', 'id'],
      ['fields[]', 'name']
    ]

    hasProducts.forEach(product => {
      params.push(['hasProducts[]', product])
    })

    url.search = new URLSearchParams(params).toString()

    fetch(url)
      .then(async res => await res.json())
      .then(data => {
        setCustomersList(data?.data)
        if (defaultCustomerId) {
          console.log({ defaultCustomerId })

          const customer = data?.data.find((customer: Customer) => customer.id === defaultCustomerId)
          const { id, name } = customer
          onChange({ id, name })
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <FormControl
      margin='none'
      size='small'
      sx={{
        minWidth: 220,
        maxWidth: 220
      }}
      disabled={isLoading}
    >
      <InputLabel>Cliente</InputLabel>
      <Select
        label='Cliente'
        onChange={handleChange}
        defaultValue={defaultCustomerId ?? undefined}
      >
        {customersList?.map(({ id, name }) => (
          <MenuItem key={id} value={id}>{name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
