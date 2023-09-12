import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Container, Grid, Paper } from '@mui/material'

import { Toolbar } from '@/components/commons/Toolbar'

import { SelectCustomer } from './SelectCustomer'
import { StatsCard } from './StatsCard'
import { API_URL } from '@/utils/constants'
import { buildQueryParams, localeDate } from '@/utils/utils'

interface Customer {
  id: string
  name: string
}

interface getPacCreditStatsResponseDTO {
  generalCount: number
  statusAnulCount?: number
  statusCancCount?: number
  statusDefiCount?: number
  statusMoraCount?: number
  statusPendCount?: number
  successScore: number
  errorScore: number
  createdAt: Date
}

interface CreditStatsItem {
  name: string
  value: number
  status?: string
}

export function PacCredits () {
  const [searchParams, setSearchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(false)
  const [customer, setCustomer] = useState<Customer | undefined>(undefined)
  const [creditStatsItems, setCreditStatsItems] = useState<CreditStatsItem[]>([])
  const [statsDate, setStatsDate] = useState<Date | undefined>(undefined)

  const handleCustomerChange = (customer: Customer) => {
    setCustomer(customer)
    searchParams.set('customerId', customer.id)
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if (customer === undefined) return
    getPacCreditStats(customer.id)
  }, [customer])

  const getPacCreditStats = (id: string) => {
    setIsLoading(true)

    const url = new URL(`${API_URL}/pac/customers/${id}/stats`)

    fetch(url)
      .then(async res => await res.json())
      .then((data: getPacCreditStatsResponseDTO) => {
        const items = [
          {
            name: 'General',
            value: data?.generalCount ?? 0,
            status: undefined,
          },
          {
            name: 'Anulados',
            value: data?.statusAnulCount ?? 0,
            status: 'ANUL',
          },
          {
            name: 'Cancelados',
            value: data?.statusCancCount ?? 0,
            status: 'CANC',
          },
          {
            name: 'Mora',
            value: data?.statusMoraCount ?? 0,
            status: 'MORA',
          },
          {
            name: 'Pendientes',
            value: data?.statusPendCount ?? 0,
            status: 'PEND',
          }
        ]
        setCreditStatsItems(items)
        setStatsDate(data?.createdAt)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper variant='outlined' sx={{ width: '100%', mb: 2, pt: 1 }}>
        <Toolbar title='Créditos PAC'>
          <SelectCustomer
            onChange={handleCustomerChange}
            defaultCustomerId={searchParams.get('customerId')}
            hasProducts={['lms']}
          />
        </Toolbar>

        <Grid container spacing={3} marginTop={1} padding={3}>
          {
            creditStatsItems.map(({ name, value, status }, index) => (
              <Grid key={index} item xs={12} md={3}>
                <StatsCard
                  title={name}
                  subtitle={'Total al ' + localeDate({ date: statsDate, withTime: false })}
                  value={value}
                  isLoading={isLoading}
                  href={`/tool/pac/credits/report?${buildQueryParams({ customerId: customer?.id, status })}`}
                  goToLabel='Ver'
                />
              </Grid>
            ))
          }
        </Grid>
      </Paper>
    </Container>
  )
}
