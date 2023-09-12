import { useState } from 'react'
import { useLocation, matchRoutes, Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Icon from '@mui/material/Icon'
import LinkMui from '@mui/material/Link'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Toolbar from '@mui/material/Toolbar'

import logo from '../../../assets/logo.png'

const drawerWidth = 240

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
          { path: '/' }
        ],
        icon: 'dashboard'
      }
    ]
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
          { path: '/admin/roles/:id/edit' }
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
              { path: '/admin/users/:id/edit' }
            ],
            icon: 'people'
          },
          {
            id: 'roles',
            title: 'Roles',
            type: 'item',
            url: '/admin/roles',
            matchRoutes: [
              { path: '/admin/roles' },
              { path: '/admin/roles/create' },
              { path: '/admin/roles/:id/edit' }
            ],
            icon: 'lock_person'
          }
        ]
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
          { path: '/admin/customers/:id/edit' }
        ],
        icon: 'business'
      }
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
          { path: '/tool/blocking/reports' },
          { path: '/tool/blocking/reports/new' },
          { path: '/tool/blocking/reports/:id' },
          { path: '/tool/blocking/consolidated' }
        ],
        icon: 'app_blocking',
        children: [
          {
            id: 'blocking-reports',
            title: 'Reportes HB',
            type: 'item',
            url: '/tool/blocking/reports',
            matchRoutes: [
              { path: '/tool/blocking/reports' },
              { path: '/tool/blocking/reports/:id' }
            ],
            icon: 'upload_file'
          },
          {
            id: 'blocking-consolidated',
            title: 'Consolidado',
            type: 'item',
            url: '/tool/blocking/consolidated',
            matchRoutes: [
              { path: '/tool/blocking/consolidated' }
            ],
            icon: 'summarize'
          }
        ]
      },

      {
        id: 'pac',
        title: 'PAC',
        type: 'collapse',
        open: null,
        matchRoutes: [
          { path: '/tool/pac/credits' },
          { path: '/tool/pac/credits/report' },
          // { path: '/tool/pac/validation' },
          { path: '/tool/pac/score' },
          { path: '/tool/pac/score/report' }
        ],
        icon: 'web',
        children: [
          {
            id: 'pac-credits',
            title: 'Créditos',
            type: 'item',
            url: '/tool/pac/credits',
            matchRoutes: [
              { path: '/tool/pac/credits' },
              { path: '/tool/pac/credits/report' }
            ],
            icon: 'payments'
          },
          // {
          //   id: 'pac-validation',
          //   title: 'Validación ID',
          //   type: 'item',
          //   url: '/tool/pac/validation',
          //   matchRoutes: [
          //     { path: '/tool/pac/validation' }
          //   ],
          //   icon: 'person_search'
          // },
          {
            id: 'pac-score',
            title: 'Score',
            type: 'item',
            url: '/tool/pac/score',
            matchRoutes: [
              { path: '/tool/pac/score' },
              { path: '/tool/pac/score/report' }
            ],
            icon: 'credit_score'
          }
        ]
      }
    ]
  }
]

function DrawerContent () {
  const location = useLocation()

  const [navigation, setNavigation] = useState(navigationData)

  const isRouteMatch = (routes: any) => {
    if (!routes) return false

    const routeMatched = matchRoutes(routes, location)

    if (routeMatched != null) {
      console.log('routeMatched ', routeMatched)
      console.log('location', location)
    }

    return (routeMatched != null)
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
      if (itemFound != null) {
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
          justifyContent: 'center'
        }}
      >
        <LinkMui href='/'>
          <Box
            component='img'
            sx={{ height: 32 }}
            alt='Logo'
            src={logo}
          />
        </LinkMui>
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
                      component={Link}
                      to={itemTwo.url ?? ''}
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
                                  component={Link}
                                  to={itemThree.url}
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
