import React from 'react'
import { Offcanvas, Nav } from 'react-bootstrap'
import { BsSpeedometer2 } from 'react-icons/bs'
import { LuUsers, LuMedal, LuNewspaper, LuLogOut } from 'react-icons/lu'
import { NavLink } from 'react-router-dom'
import AppButton from '../Button'

const Sidebar = ({ show, handleClose, handleLogout }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} responsive="md" className="sidebar bg-primary text-light d-flex flex-column">
      <Offcanvas.Header className="d-md-block border-bottom">
        <Offcanvas.Title className="fw-bold text-center p-1">Prestasi IPI</Offcanvas.Title>
        <AppButton action={handleClose} size="sm" className="d-md-none btn-close btn-close-white" />
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column flex-grow-1">
        <Nav className="flex-column">
          <NavLink to="/admin/dashboard" className="w-100 py-3 px-4 text-white d-flex align-items-center" activeclassname="active">
            <BsSpeedometer2 className="me-2" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/users" className="w-100 py-3 px-4 text-white d-flex align-items-center" activeclassname="active">
            <LuUsers className="me-2" />
            <span>Pengguna</span>
          </NavLink>
          <NavLink to="/admin/achievements" className="w-100 py-3 px-4 text-white d-flex align-items-center" activeclassname="active">
            <LuMedal className="me-2" />
            <span>Prestasi</span>
          </NavLink>
          <NavLink to="/admin/news" className="w-100 py-3 px-4 text-white d-flex align-items-center" activeclassname="active">
            <LuNewspaper className="me-2" />
            <span>Berita</span>
          </NavLink>
        </Nav>

        <div className="mt-auto">
          <AppButton
            action={handleLogout}
            variant="transparent"
            className="d-flex align-items-center justify-content-center w-100 py-3 px-4 text-white py-4"
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
