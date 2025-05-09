import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

const AlertMessage = ({ type, message }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return <Alert variant={type}>{message}</Alert>
}

export default AlertMessage
