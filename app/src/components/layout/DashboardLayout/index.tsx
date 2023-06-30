import { Outlet } from 'react-router-dom'
import { Box, Toolbar } from '@mui/material'

import AppBarContent from './AppBar'
import DrawerContent from './Drawer'
import Snackbar from '../../commons/Snackbar'

const drawerWidth: number = 240;

function DashboardLayout () {
  return (
    <>
      <AppBarContent />
      <DrawerContent />
      <Box
        component="main"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Outlet />
        <Snackbar />
      </Box>
    </>
  )
}

export default DashboardLayout
