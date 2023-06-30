import { AppBar, Toolbar, Typography } from "@mui/material"
// import MenuIcon from '@mui/icons-material/Menu'

import ProfileDropdown from './ProfileDropdown'

const drawerWidth: number = 240

function AppBarContent () {
  return (
    <AppBar
      position="absolute"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar>
        {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <MenuIcon />
        </IconButton> */}
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Equality Conciliación
        </Typography>
        <ProfileDropdown />
      </Toolbar>
    </AppBar>
  )
}

export default AppBarContent
