import { useState } from 'react'
import { IconButton, Typography, Avatar, Box, Menu, MenuItem, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import profile from '../../../../../assets/profile.png'

const settings = ['Cerrar sesión']

function ProfileDropdown () {
  const navigate = useNavigate()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleMenuItemClick = (
    _: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    if (index === 0) {
      localStorage.removeItem('token')
      navigate('/')
    }
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Abrir configuración' arrow>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt='Photo' src={profile} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((item, index) => (
          <MenuItem key={item} onClick={e => handleMenuItemClick(e, index)}>
            <Typography textAlign='center'>{item}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default ProfileDropdown
