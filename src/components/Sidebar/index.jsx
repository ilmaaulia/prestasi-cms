import React from 'react'
import { Offcanvas, Nav } from 'react-bootstrap'
import { BsSpeedometer2 } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LuUsers, LuUser, LuMedal, LuNewspaper, LuLogOut } from 'react-icons/lu'
import NavLink from '../NavAccess'
import AppButton from '../Button'
import {
  accessDashboardForAdmin,
  accessAchievementsForAdmin,
  accessNews,
  accessUsers,
  accessDashboardForStudent,
  accessAchievementsForStudent,
  accessProfile,
} from '../../constants/access'

const Sidebar = ({ show, handleClose, handleLogout }) => {
  const navigate = useNavigate()
  const role = useSelector((state) => state.auth?.role)

  return (
    <Offcanvas show={show} onHide={handleClose} responsive="md" className="sidebar bg-primary text-light d-flex flex-column">
      <Offcanvas.Header className="d-md-block border-bottom">
        <Offcanvas.Title className="fw-bold text-center p-1">Prestasi IPI</Offcanvas.Title>
        <AppButton action={handleClose} size="md" className="d-md-none btn-close btn-close-white" variant="transparent" />
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column flex-grow-1">
        <Nav className="flex-column">
          <NavLink 
            role={role}
            roles={accessDashboardForAdmin.read}
            action={() => navigate('/admin/dashboard')}
            to="/admin/dashboard"
            className="w-100 py-3 px-4 text-white d-flex align-items-center"
          >
            <BsSpeedometer2 className="me-2" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink 
            role={role}
            roles={accessUsers.read}
            action={() => navigate('/admin/users')}
            to="/admin/users"
            className="w-100 py-3 px-4 text-white d-flex align-items-center"
          >
            <LuUsers className="me-2" />
            <span>Pengguna</span>
          </NavLink>
          <NavLink 
            role={role}
            roles={accessAchievementsForAdmin.read}
            action={() => navigate('/admin/achievements')}
            to="/admin/achievements"
            className="w-100 py-3 px-4 text-white d-flex align-items-center"
          >
            <LuMedal className="me-2" />
            <span>Prestasi</span>
          </NavLink>
          <NavLink 
            role={role}
            roles={accessNews.read}
            action={() => navigate('/admin/news')}
            to="/admin/news"
            className="w-100 py-3 px-4 text-white d-flex align-items-center"
          >
            <LuNewspaper className="me-2" />
            <span>Berita</span>
          </NavLink>
          <NavLink 
            role={role}
            roles={accessDashboardForStudent.read}
            action={() => navigate('/student/dashboard')}
            to="/student/dashboard"
            className="w-100 py-3 px-4 text-white d-flex align-items-center"
          >
            <BsSpeedometer2 className="me-2" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink 
            role={role}
            roles={accessAchievementsForStudent.read}
            action={() => navigate('/student/achievements/')}
            to="/student/achievements/"
            className="w-100 py-3 px-4 text-white d-flex align-items-center"
          >
            <LuMedal className="me-2" />
            <span>Prestasi</span>
          </NavLink>
          <NavLink 
            role={role}
            roles={accessProfile.read}
            action={() => navigate('/student/profile/:id')}
            to="/student/profile/:id"
            className="w-100 py-3 px-4 text-white d-flex align-items-center"
          >
            <LuUser className="me-2" />
            <span>Profil</span>
          </NavLink>
        </Nav>

        <div className="mt-auto p-3">
          <AppButton
            action={handleLogout}
            variant="transparent"
            className="d-flex align-items-center justify-content-center w-100 py-3 px-4 text-white"
          >
            <LuLogOut className="me-2" />
            Logout
          </AppButton>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Sidebar
