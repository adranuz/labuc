import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import AuthGuard from './guards/AuthGuard'

const DashboardLayout = lazy(async () => await import('@/components/layout/DashboardLayout'))
const DashboardPage = lazy(async () => await import('@/components/pages/Dashboard'))
const UsersPage = lazy(async () => await import('@/components/pages/Users'))
const UserCreatePage = lazy(async () => await import('@/components/pages/Users/UserCreatePage'))
const UserEditPage = lazy(async () => await import('@/components/pages/Users/UserEditPage'))
const RolesPage = lazy(async () => await import('@/components/pages/Roles'))
const RoleCreatePage = lazy(async () => await import('@/components/pages/Roles/RoleCreatePage'))
const RoleEditPage = lazy(async () => await import('@/components/pages/Roles/RoleEditPage'))
const CustomersPage = lazy(async () => await import('@/components/pages/Customers'))
const CustomerCreatePage = lazy(async () => await import('@/components/pages/Customers/CustomerCreatePage'))
const CustomerDetailsPage = lazy(async () => await import('@/components/pages/Customers/CustomerDetailsPage'))
const CustomerEditPage = lazy(async () => await import('@/components/pages/Customers/CustomerEditPage'))
const BlockingDevicesPage = lazy(async () => await import('@/components/pages/Blocking/BlockingDevicesPage'))
const BlockingDeviceNewPage = lazy(async () => await import('@/components/pages/Blocking/BlockingDeviceNewPage'))
const BlockingDeviceConsolidatedReportPage = lazy(async () => await import('@/components/pages/Blocking/BlockingDeviceConsolidatedReportPage'))
const BlockingDevicePage = lazy(async () => await import('@/components/pages/Blocking/BlockingDevicePage'))
const PacCreditsPage = lazy(async () => await import('@/components/pages/Pac/PacCreditsPage'))
const PacCreditsReportPage = lazy(async () => await import('@/components/pages/Pac/PacCreditsReportPage'))
const PacScorePage = lazy(async () => await import('@/components/pages/Pac/PacScorePage'))
const PacScoreReportPage = lazy(async () => await import('@/components/pages/Pac/PacScoreReportPage'))

const AuthRoutes = (): RouteObject => {
  return {
    path: '/',

    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        element: <DashboardPage />
      },
      {
        path: 'admin/users',
        children: [
          {
            path: '',
            element: <UsersPage />
          },
          {
            path: 'create',
            element: <UserCreatePage />
          },
          {
            path: ':id/edit',
            element: <UserEditPage />
          }
        ]
      },
      {
        path: 'admin/roles',
        children: [
          {
            path: '',
            element: <RolesPage />
          },
          {
            path: 'create',
            element: <RoleCreatePage />
          },
          {
            path: ':id/edit',
            element: <RoleEditPage />
          }
        ]
      },
      {
        path: 'admin/customers',
        children: [
          {
            path: '',
            element: <CustomersPage />
          },
          {
            path: 'create',
            element: <CustomerCreatePage />
          },
          {
            path: ':id',
            element: <CustomerDetailsPage />
          },
          {
            path: ':id/edit',
            element: <CustomerEditPage />
          }
        ]
      },
      {
        path: 'tool/blocking',
        children: [
          {
            path: 'reports',
            children: [
              {
                path: '',
                element: <BlockingDevicesPage />
              },
              {
                path: 'new',
                element: <BlockingDeviceNewPage />
              },
              {
                path: ':id',
                element: <BlockingDevicePage />
              }
            ]
          },
          {
            path: 'consolidated',
            element: <BlockingDeviceConsolidatedReportPage />
          }
        ]
      },
      {
        path: 'tool/pac',
        children: [
          {
            path: 'credits',
            element: <PacCreditsPage />
          },
          {
            path: 'credits/report',
            element: <PacCreditsReportPage />
          },
          {
            path: 'score',
            element: <PacScorePage />
          },
          {
            path: 'score/report',
            element: <PacScoreReportPage />
          }
        ]
      }
    ]
  }
}

export default AuthRoutes
