import { NotFound } from '@/components/commons/NotFound'

import { RouteObject } from 'react-router-dom'

const NotFoundRoute = (): RouteObject => {
  return {
    path: '*',
    element: (
      <NotFound />
    )
  }
}

export default NotFoundRoute
