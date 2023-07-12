import { useState } from 'react'
import { useNavigate, useLocation, matchRoutes } from 'react-router-dom'

import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Icon from '@mui/material/Icon'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Toolbar from '@mui/material/Toolbar'

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
        icon: 'dashboard',
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
        icon: 'lock',
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
            icon: 'people',
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
            icon: 'lock_person',
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
        icon: 'business',
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
        icon: 'app_blocking',
        children: [
          {
            id: 'imports',
            title: 'Importaciones',
            type: 'item',
            url: '/tool/blocking/imports',
            matchRoutes: [
              { path: '/tool/blocking/imports' },
            ],
            icon: 'upload_file',
          },
          {
            id: 'activation-report',
            title: 'Consolidado',
            type: 'item',
            url: '/tool/blocking/report/activation',
            matchRoutes: [
              { path: '/tool/blocking/report/activation' },
            ],
            icon: 'assessment',
          },
        ],
      },
    ]
  }
]

function DrawerContent() {
  const navigate = useNavigate()
  const location = useLocation()

  const [navigation, setNavigation] = useState(navigationData)

  const isRouteMatch = (routes: any) => {
    if (!routes) return false

    const routeMatched = matchRoutes(routes, location)

    return routeMatched ? true : false
  }

  const getOpenCollapseValue = (item: navigationChildren) => {
    const { id, open, matchRoutes } = item
    if (open === null) {
      const newOpen = isRouteMatch(matchRoutes)
      if (newOpen) {
        toogleCollapseListItem(id)
      }
      return newOpen
    }
    return open
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
                        <Icon>{itemTwo.icon}</Icon>
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
                          <Icon>{itemTwo.icon}</Icon>
                        </ListItemIcon>
                        <ListItemText
                          primary={itemTwo.title}
                        />
                        {getOpenCollapseValue(itemTwo) ? <ExpandLess /> : <ExpandMore />}
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
                                    <Icon>{itemThree.icon}</Icon>
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
