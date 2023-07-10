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
  comissionTerm: string().regex(ISO_DATE_REGEX, 'La vigencia de comisión debe estar en formato yyyy-MM-dd').nullable(),
  percentageComissions: z.coerce.number()
    .gte(0, 'El porcentaje de comisión debe ser mayor o igual a 0')
    .lte(100, 'El porcentaje de comisión debe ser menor o igual a 100'),
  contacts: z.array(object({
    type: string(),
    name: string().optional(),
    email: string().optional()
  })),
  products: z.array(object({
    shortName: string()
  })),
  devices: z.array(string()),
  skuStart: string(),
  skuEnd: string(),
  sku3m: z.boolean()
})

interface Props {
  customer?: any
  productsList?: any
  readOnly?: boolean
  newCustomer?: boolean
  isLoading?: boolean
}

function CustomerForm ({customer, productsList = null, readOnly = false, newCustomer = false, isLoading = false}: Props) {
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

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = useForm<any>({
    defaultValues: {
      customId: customer?.customId || '',
      name: customer?.name || '',
      email: customer?.email || '',
      country: customer?.country || '',
      economicActivity: customer?.economicActivity || '',
      status: customer?.status || '',
      rfc: customer?.rfc || '',
      registeredName: customer?.registeredName || '',
      address: customer?.address || '',
      sellerName: customer?.sellerName || '',
      comissionTerm: customer?.comissionTerm?.slice(0, 10) || null,
      percentageComissions: customer?.percentageComissions || 0,
      sellerComments: customer?.sellerComments || '',
      contacts: customer?.contacts || [{ type: 'com' }, { type: 'tec' }],
      products: customer?.products || [],
      devices: customer?.devices || [],
      skuStart: customer?.skuStart || '',
      skuEnd: customer?.skuEnd || '',
      sku3m: customer?.sku3m || false
    },
    resolver: zodResolver(customerSchema),
  })

  const { fields } = useFieldArray({
    name: 'contacts',
    control: control,
  })

  const handleClickBack = () => {
    toCustomers()
  }

  const handleClickEdit = () => {
    toEditCustomer()
  }

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data)
    toCustomer()
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
              newCustomer ? 'Cliente sin nombre' :  customer?.name
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
              <CustomerGeneral
                readOnly={readOnly}
                isLoading={isLoading}
                control={control}
                register={register}
                errors={errors}
              />
            </TabPanel>
            <TabPanel value='contacts'>
              <CustomerContacts
                readOnly={readOnly}
                isLoading={isLoading}
                control={control}
                fields={fields}
                errors={errors}
              />
            </TabPanel>
            <TabPanel value='products'>
              <CustomerProducts
                productsList={productsList}
                products={customer?.products}
                readOnly={readOnly}
                isLoading={isLoading}
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
