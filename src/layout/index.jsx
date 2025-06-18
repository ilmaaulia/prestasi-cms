import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Hamburger from '../components/Hamburger'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../redux/auth/actions'
import Swal from 'sweetalert2'

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleToggleSidebar = () => setShowSidebar(!showSidebar)
  const handleLogout = () => {
    Swal.fire({
      title: 'Keluar Akun',
      text: 'Apakah Anda yakin ingin keluar?',
      confirmButtonColor: '#d33',
      showCancelButton: true,
      confirmButtonText: 'Ya, Keluar!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userLogout())
        navigate('/admin/login')
      }
    })
  }

  return (
    <Container fluid className="d-flex flex-column p-0">
      <Hamburger handleShow={handleToggleSidebar} />
      
      <div className="d-flex vh-100">
        <Sidebar 
          show={showSidebar} 
          handleClose={handleToggleSidebar} 
          handleLogout={handleLogout} 
        />

        <main className="flex-grow-1 p-5 bg-light vh-100 overflow-auto">
          <Outlet />
        </main>
      </div>
    </Container>
  )
}

export default Layout
