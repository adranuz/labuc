import { useState } from 'react'

import { Box, Container, Paper, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import CategoryIcon from '@mui/icons-material/Category'
import ContactsIcon from '@mui/icons-material/Contacts'
import InfoIcon from '@mui/icons-material/Info'

import CustomerGeneral from './CustomerGeneral'
import CustomerContacts from './CustomerContacts'
import CustomerProducts from './CustomerProducts'

interface Props {
  customer?: any
  readOnly?: boolean
}

function CustomerForm ({customer, readOnly = false}: Props) {
  const [tab, setTab] = useState('1');

  const handleChangeTab = (_: React.SyntheticEvent, value: string) => {
    setTab(value);
  };
  
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper variant='outlined'>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label='lab API tabs example' indicatorColor='secondary'>
              <Tab icon={<InfoIcon />} iconPosition='start' label='Información general' value='1' />
              <Tab icon={<ContactsIcon />} iconPosition='start' label='Contactos' value='2' />
              <Tab icon={<CategoryIcon />} iconPosition='start' label='Productos' value='3' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <CustomerGeneral customer={customer} readOnly={readOnly} />
          </TabPanel>
          <TabPanel value='2'>
            <CustomerContacts contacts={customer?.contacts} readOnly={readOnly} />
          </TabPanel>
          <TabPanel value='3'>
            <CustomerProducts products={customer?.products} readOnly={readOnly} />
          </TabPanel>
        </TabContext>
      </Paper>
    </Container>
  )
}

export default CustomerForm
