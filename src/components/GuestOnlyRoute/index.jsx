import * as React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const GuestOnlyRoute = ({ children }) => {
  const { token, role } = useSelector((state) => state.auth)

  if (token) {
    if (role === 'student') return <Navigate to='/' replace={true} />
    if (role === 'admin') return <Navigate to='/admin/dashboard' replace={true} />
  }

  return children || <Outlet />
}

export default GuestOnlyRoute
