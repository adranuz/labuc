import { useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

import { Box, Container, Tab, Button, Paper, Toolbar, Typography, IconButton } from '@mui/material'
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab'
import CategoryIcon from '@mui/icons-material/Category'
import ContactsIcon from '@mui/icons-material/Contacts'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import ConfirmCustomerDeletion from './ConfirmCustomerDeletion'
import CustomerGeneral from './CustomerGeneral'
import CustomerContacts from './CustomerContacts'
import CustomerProducts from './CustomerProducts'

interface Props {
  customer?: any
  productsList?: any
  readOnly?: boolean
}

function CustomerForm ({customer, productsList = null, readOnly = false}: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [tab, setTab] = useState(searchParams.get('tab') || 'general')

  const handleChangeTab = (_: React.SyntheticEvent, value: string) => {
    setTab(value)
    setSearchParams({
      tab: value,
    })
  }

  const handleClickBack = () => {
    toCustomers()
  }

  const handleClickEdit = () => {
    toEditCustomer()
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (customer?.name) {
      toCustomer()
    }
  }

  const toCustomers = () => {
    if (location.state) {
      const {perPage, page, q} = location.state
      navigate({
        pathname: '/admin/customers',
        search: `?perPage=${perPage}&page=${page}&q=${q}`,
      })
    } else {
      navigate('/admin/customers')
    }
  }

  const toCustomer = () => {
    navigate({
      pathname: `/admin/customers/${customer?.id}`,
      search: `?tab=${tab}`,
    }, {
      state: location.state
    })
  }

  const toEditCustomer = () => {
    navigate({
      pathname: `/admin/customers/${customer?.id}/edit`,
      search: `?tab=${tab}`,
    })
  }
  
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box component='form' onSubmit={handleSubmit} noValidate>
        <Toolbar disableGutters>
          <IconButton
            size='large'
            color='inherit'
            sx={{ mr: 2 }}
            onClick={handleClickBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            noWrap
            sx={
              customer?.name
                ? {
                    flexGrow: 1,
                  }
                : {
                    flexGrow: 1,
                    fontStyle: 'italic'
                  }
            }
          >
            {
              customer?.name ? customer?.name : 'Cliente sin nombre'
            }
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2
            }}
          >
            <Button
              size='small'
              color='info'
              startIcon={<EditIcon />}
              onClick={handleClickEdit}
              disabled={!readOnly}
            >
              Editar
            </Button>
            <ConfirmCustomerDeletion
              id={customer?.id}
              name={customer?.name}
              onFinished={() => {}}
              disabled={!readOnly}
            />
            <LoadingButton
              variant='contained'
              size='small'
              disableElevation
              startIcon={<SaveAltIcon />}
              type='submit'
              disabled={readOnly}
            >
              Guardar
            </LoadingButton>
          </Box>
        </Toolbar>

        <Paper variant='outlined'>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeTab} indicatorColor='secondary'>
                <Tab icon={<InfoIcon />} iconPosition='start' label='Información general' value='general' />
                <Tab icon={<ContactsIcon />} iconPosition='start' label='Contactos' value='contacts' />
                <Tab icon={<CategoryIcon />} iconPosition='start' label='Productos' value='products' />
              </TabList>
            </Box>
            <TabPanel value='general'>
              <CustomerGeneral customer={customer} readOnly={readOnly} />
            </TabPanel>
            <TabPanel value='contacts'>
              <CustomerContacts contacts={customer?.contacts} readOnly={readOnly} />
            </TabPanel>
            <TabPanel value='products'>
              <CustomerProducts productsList={productsList} products={customer?.products} readOnly={readOnly} />
            </TabPanel>
          </TabContext>
        </Paper>
      </Box>
    </Container>
  )
}

export default CustomerForm
