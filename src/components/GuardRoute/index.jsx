import * as React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const GuardRoute = ({ children, userRole }) => {
  const { token, role } = useSelector((state) => state.auth)

  if (!token) return <Navigate to='/login' replace={true} />

  if (userRole && role !== userRole) return <Navigate to={`/${role}/dashboard`} replace={true} />

  return children || <Outlet />
}

export default GuardRoute
