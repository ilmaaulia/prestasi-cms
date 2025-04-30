import React from 'react'
import { Nav } from 'react-bootstrap'

const NavLink = ({ role, roles, action, children, className }) => {
  let isHas = roles.indexOf(role)
  return <>{isHas >= 0 && <Nav.Link onClick={action} className={className}>{children}</Nav.Link>}</>
}

export default NavLink
