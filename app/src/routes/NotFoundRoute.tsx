import { RouteObject } from 'react-router-dom'

const NotFoundRoute = (): RouteObject => {
  return {
    path: '*',
    element: (
      <>
        {'Not Found'}
      </>
    ),
  } 
}

export default NotFoundRoute
