import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  children: ReactNode
}

const AuthGuard = ({ children }: Props) => {

  const token = localStorage.getItem('token')

  if (token) {
    return <>{children}</>
  }

  return <Navigate to={'/login'} replace />
}

export default AuthGuard
