import { useState } from 'react'
import { useNavigate, useLocation, matchRoutes } from 'react-router-dom'

import { Box, Collapse, Divider, Drawer, Link, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Toolbar } from '@mui/material'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import * as MUIcon from '@mui/icons-material'

import logo from '../../../assets/logo.png'

const drawerWidth: number = 240

interface navigation {
  id: string
  title: string
  type: string
  children: navigationChildren[]
}

interface navigationChildren {
  id: string
  title: string
  type: string
  url?: string
  open?: boolean | null
  matchRoutes: any[]
  icon: string
  children?: any[]
}

const navigationData: navigation[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
      {
        id: '',
        title: 'Dashboard',
        type: 'item',
        url: '/',
        matchRoutes: [
          { path: '/' },
        ],
        icon: 'Dashboard',
      },
    ],
  },
  {
    id: 'administration',
    title: 'Administración',
    type: 'group',
    children: [
      {
        id: 'authentication',
        title: 'Autenticación',
        type: 'collapse',
        open: null,
        matchRoutes: [
          { path: '/admin/users' },
          { path: '/admin/users/create' },
          { path: '/admin/users/:id/edit' },
          { path: '/admin/roles' },
          { path: '/admin/roles/create' },
          { path: '/admin/roles/:id/edit' },
        ],
        icon: 'Lock',
        children: [
          {
            id: 'users',
            title: 'Usuarios',
            type: 'item',
            url: '/admin/users',
            matchRoutes: [
              { path: '/admin/users' },
              { path: '/admin/users/create' },
              { path: '/admin/users/:id/edit' },
            ],
            icon: 'People',
          },
          {
            id: 'roles',
            title: 'Roles',
            type: 'item',
            url: '/admin/roles',
            matchRoutes: [
              { path: '/admin/roles' },
              { path: '/admin/roles/create' },
              { path: '/admin/roles/:id/edit' },
            ],
            icon: 'LockPerson',
          },
        ],
      },
      {
        id: 'customers',
        title: 'Clientes',
        type: 'item',
        url: '/admin/customers',
        matchRoutes: [
          { path: '/admin/customers' },
          { path: '/admin/customers/create' },
          { path: '/admin/customers/:id' },
          { path: '/admin/customers/:id/edit' },
        ],
        icon: 'Business',
      },
    ]
  },
  {
    id: 'tools',
    title: 'Herramientas',
    type: 'group',
    children: [
      {
        id: 'blocking',
        title: 'Bloqueo',
        type: 'collapse',
        open: null,
        matchRoutes: [
          { path: '/tool/blocking/imports' },
          { path: '/tool/blocking/imports/new' },
        ],
        icon: 'AppBlocking',
        children: [
          {
            id: 'imports',
            title: 'Importaciones',
            type: 'item',
            url: '/tool/blocking/imports',
            matchRoutes: [
              { path: '/tool/blocking/imports' },
            ],
            icon: 'UploadFile',
          },
          {
            id: 'activation-report',
            title: 'Consolidado',
            type: 'item',
            url: '/tool/blocking/report/activation',
            matchRoutes: [
              { path: '/tool/blocking/report/activation' },
            ],
            icon: 'Assessment',
          },
        ],
      },
    ]
  }
]

function DrawerContent () {
  const navigate = useNavigate()
  const location = useLocation()

  const [navigation, setNavigation] = useState(navigationData)

  const isRouteMatch = (routes: any) => {
    if (!routes) return false

    const routeMatched = matchRoutes(routes, location)
    
    return routeMatched ? true : false
  }

  const getOpenCollapseValue = (item: navigationChildren) => {
    const {id, open, matchRoutes} = item
    if (open === null) {
      const newOpen = isRouteMatch(matchRoutes)
      if (newOpen) {
        toogleCollapseListItem(id)
      }
      return newOpen
    }
    return open
  }

  const Icon = (variation, props = {}) => {
    const IconName = MUIcon[variation]
    return <IconName {...props} />
  }

  const toogleCollapseListItem = (id: string) => {
    const newNavigation = [...navigation]
    newNavigation?.map(item => {
      const itemFound = item?.children.find(itemThree => itemThree.id === id)
      if (itemFound) {
        itemFound.open = !itemFound.open
      }
    })
    setNavigation(newNavigation)
  }

  return (
    <Drawer
      variant='permanent'
      open
      PaperProps={{
        sx: {
          width: drawerWidth
        }
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link href='/'>
          <Box
            component='img'
            sx={{ height: 32 }}
            alt='Logo'
            src={logo}
          />
        </Link>
      </Toolbar>
      <Divider />
      <List component='nav'>
        {
          navigation.map(itemOne => (
            <>
              {
                itemOne.type === 'group' && <ListSubheader key={itemOne.id}>{itemOne.title}</ListSubheader>
              }
              {
                itemOne?.children.map(itemTwo => (
                  itemTwo.type === 'item' && (
                    <ListItemButton
                      key={itemTwo.id}
                      onClick={() => { itemTwo?.url && navigate(itemTwo.url) }}
                      selected={isRouteMatch(itemTwo?.matchRoutes)}
                    >
                      <ListItemIcon>
                        { Icon(itemTwo.icon) }
                      </ListItemIcon>
                      <ListItemText
                        primary={itemTwo.title}
                        primaryTypographyProps={
                          isRouteMatch(itemTwo?.matchRoutes)
                          ? { fontWeight: 'medium' }
                          : {}
                        }
                      />
                    </ListItemButton>
                  ) || itemTwo.type === 'collapse' && (
                    <div key={itemTwo.id}>
                      <ListItemButton
                        onClick={() => { toogleCollapseListItem(itemTwo.id) }}
                      >
                        <ListItemIcon>
                          { Icon(itemTwo.icon) }
                        </ListItemIcon>
                        <ListItemText
                          primary={itemTwo.title}
                        />
                        { getOpenCollapseValue(itemTwo) ? <ExpandLess /> : <ExpandMore /> }
                      </ListItemButton>
                      <Collapse in={getOpenCollapseValue(itemTwo)} timeout='auto' unmountOnExit>
                        <List component='div' disablePadding>
                          {
                            itemTwo?.children?.map(itemThree => (
                              itemThree.type === 'item' && (
                                <ListItemButton
                                   key={itemThree.id}
                                  onClick={() => { navigate(itemThree.url) }}
                                  selected={isRouteMatch(itemThree?.matchRoutes)}
                                  sx={{ pl: 4 }}
                                >
                                  <ListItemIcon>
                                    { Icon(itemThree.icon) }
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={itemThree.title}
                                    primaryTypographyProps={
                                      isRouteMatch(itemThree?.matchRoutes)
                                      ? { fontWeight: 'medium' }
                                      : {}
                                    }
                                  />
                                </ListItemButton>
                              )
                            ))
                          }
                        </List>
                      </Collapse>
                    </div>
                  )
                ))
              }
            </>
          ))
        }
      </List>
    </Drawer>
  )
}

export default DrawerContent
