import React from 'react'
import { Navbar } from 'react-bootstrap'

const Hamburger = ({ handleShow }) => {
  return (
    <Navbar expand="md" className="w-100 px-2 bg-primary text-white d-md-none">
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} />
    </Navbar>
  )
}

export default Hamburger
