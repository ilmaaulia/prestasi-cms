import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from '../components/SidebarAdmin'
import Hamburger from '../components/Hamburger'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../redux/auth/actions'

const AdminLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleToggleSidebar = () => setShowSidebar(!showSidebar)
  const handleLogout = () => {
    dispatch(userLogout())
    navigate('/admin/login')
  }

  return (
    <Container fluid className="d-flex flex-column p-0">
      <Hamburger handleShow={handleToggleSidebar} />
      
      <div className="d-flex vh-100">
        <SidebarAdmin 
          show={showSidebar} 
          handleClose={handleToggleSidebar} 
          handleLogout={handleLogout} 
        />

        <main className="flex-grow-1 p-5 vh-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </Container>
  )
}

export default AdminLayout
