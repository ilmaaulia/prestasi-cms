import React from 'react'
import { Nav } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

const NavLink = ({ role, roles, action, children, className, to }) => {
  const location = useLocation()
  let isHas = roles.indexOf(role)
  const isActive = location.pathname === to
  const combinedClass = className + (isActive ? ' active' : '')
  return <>{isHas >= 0 && <Nav.Link onClick={action} className={combinedClass}>{children}</Nav.Link>}</>
}

export default NavLink
