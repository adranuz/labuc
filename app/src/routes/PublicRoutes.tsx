import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const DefaultLayout = lazy(async () => await import('../components/layout/DefaultLayout'))
const LoginPage = lazy(async () => await import('../components/pages/Login'))

const PublicRoutes = (): RouteObject => {
  return {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  }
}

export default PublicRoutes
