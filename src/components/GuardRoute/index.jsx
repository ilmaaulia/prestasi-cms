import * as React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const GuardRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth)

  if (!token) return <Navigate to='/admin/login' replace={true} />

  return children || <Outlet />
}

export default GuardRoute
