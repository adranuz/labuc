import { useState } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form'
import { object, string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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

import { useCommonStore } from '@/store/common'
import { API_URL } from '@/utils/constants'

const ISO_DATE_REGEX = /^\d{4}-[01]\d-[0-3]\d$|^$/

const customerSchema = object({
  customId: string(),
  name: string(),
  email: string(),
  country: string(),
  registeredName: string(),
  rfc: string(),
  address: string(),
  economicActivity: string(),
  status: string(),
  sellerName: string(),
  sellerComments: string(),
  comissionTerm: string().regex(ISO_DATE_REGEX, 'La fecha debe estar en formato yyyy-MM-dd'),
  percentageComissions: z.coerce.number()
    .gte(0, 'El porcentaje de comisión debe ser mayor o igual a 0')
    .lte(100, 'El porcentaje de comisión debe ser menor o igual a 100'),
  products: z.array(object({
    shortName: string()
  })),
  contacts: z.array(object({
    type: string(),
    name: string().optional(),
    email: string().optional()
  })),
  devices: z.array(string()),
  skuStart: string(),
  skuEnd: string(),
  sku3m: z.boolean(),
  skuHBMF: z.boolean(),
  skuHBMPRE: z.boolean()
})

interface Props {
  customer?: Customer
  productsList?: any
  readOnly?: boolean
  newCustomer?: boolean
  isLoading?: boolean
}

interface Customer {
  id: string
  customId: string
  name: string
  email: string
  country: string
  registeredName: string
  rfc: string
  address: string
  economicActivity: string
  status: string
  sellerName: string
  sellerComments: string
  comissionTerm: string
  percentageComissions: number
  createdAt: Date
  updatedAt: Date
  devices: string[]
  skuStart: string
  skuEnd: string
  sku3m: boolean
  skuHBMF: boolean
  skuHBMPRE: boolean
  products: Product[]
  contacts: Contact[]
}

interface Contact {
  name: string
  email: string
  type: string
}

interface Product {
  name: string
  shortName: string
}

function CustomerForm ({ customer, productsList = null, readOnly = false, newCustomer = false, isLoading = false }: Props) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const showSnackbar = useCommonStore((state) => state.showSnackbar)

  const [tab, setTab] = useState(searchParams.get('tab') ?? 'general')

  const handleChangeTab = (_: React.SyntheticEvent, value: string) => {
    setTab(value)
    setSearchParams({
      tab: value
    })
  }

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue
  } = useForm<Customer>({
    defaultValues: { ...customer },
    resolver: zodResolver(customerSchema)
  })

  const { append, fields, remove } = useFieldArray({
    name: 'contacts',
    control
  })

  const handleClickBack = () => {
    toCustomers()
  }

  const handleClickEdit = () => {
    toEditCustomer()
  }

  const onSubmit: SubmitHandler<any> = (data) => {
    if (newCustomer) {
      createCustomer(data)
    } else {
      updateCustomer(customer?.id, data)
    }
  }

  const updateCustomer = (id, data) => {
    setIsSubmitLoading(true)

    const url = new URL(`${API_URL}/customers/${id}`)

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          showSnackbar('Error al intentar acualizar el cliente', 'error')
          return
        }

        toCustomer()
        showSnackbar('El cliente se actualizó correctamente', 'success')
      })
      .catch(_ => showSnackbar('Error al intentar acualizar el cliente', 'error'))
      .finally(() => setIsSubmitLoading(false))
  }

  const createCustomer = (data) => {
    setIsSubmitLoading(true)

    const url = new URL(`${API_URL}/customers`)

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          showSnackbar('Error al intentar crear el cliente', 'error')
          return
        }

        toCustomers()
        showSnackbar('El cliente se creó correctamente', 'success')
      })
      .catch(_ => showSnackbar('Error al intentar crear el cliente', 'error'))
      .finally(() => setIsSubmitLoading(false))
  }

  const toCustomers = () => {
    if (location.state) {
      const { perPage, page, q } = location.state
      navigate({
        pathname: '/admin/customers',
        search: `?perPage=${perPage}&page=${page}&q=${q}`
      })
    } else {
      navigate('/admin/customers')
    }
  }

  const toCustomer = () => {
    navigate({
      pathname: `/admin/customers/${customer?.id}`,
      search: `?tab=${tab}`
    }, {
      state: location.state
    })
  }

  const toEditCustomer = () => {
    navigate({
      pathname: `/admin/customers/${customer?.id}/edit`,
      search: `?tab=${tab}`
    })
  }

  const deleteContactByIndex = (index: number) => {
    remove(index)
  }

  const addContact = () => {
    console.log('addContact')
    append({ type: 'com', name: '', email: '' })
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
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
            component='h2'
            variant='h5'
            noWrap
            sx={
              customer?.name
                ? {
                  flexGrow: 1
                }
                : {
                  flexGrow: 1,
                  fontStyle: 'italic'
                }
            }
          >
            {
              newCustomer ? 'Cliente sin nombre' : customer?.name
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
              onFinished={() => { }}
              disabled={!readOnly}
            />
            <LoadingButton
              variant='contained'
              size='small'
              loadingPosition='start'
              disableElevation
              startIcon={<SaveAltIcon />}
              type='submit'
              disabled={readOnly || isSubmitLoading}
              loading={isSubmitLoading}
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
              <CustomerGeneral
                readOnly={readOnly}
                isLoading={isLoading || isSubmitLoading}
                control={control}
                register={register}
                errors={errors}
              />
            </TabPanel>
            <TabPanel value='contacts'>
              <CustomerContacts
                readOnly={readOnly}
                isLoading={isLoading || isSubmitLoading}
                control={control}
                fields={fields}
                errors={errors}
                deleteContactByIndex={deleteContactByIndex}
                addContact={addContact}
              />
            </TabPanel>
            <TabPanel value='products'>
              <CustomerProducts
                productsList={productsList}
                products={customer?.products}
                readOnly={readOnly}
                isLoading={isLoading || isSubmitLoading}
                control={control}
                register={register}
                errors={errors}
                getValues={getValues}
                setValue={setValue}
              />
            </TabPanel>
          </TabContext>
        </Paper>
      </Box>
    </Container>
  )
}

export default CustomerForm
