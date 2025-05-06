import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertMessage = ({ type, message }) => {
  return <Alert variant={type}>{message}</Alert>
}

export default AlertMessage
