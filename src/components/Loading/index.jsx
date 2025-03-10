import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <Container className="text-center m-3">
      <div className="d-flex justify-content-center align-items-center gap-2">
        <Spinner animation="grow" variant="primary" size="sm" />
        <Spinner animation="grow" variant="primary" size="sm" />
        <Spinner animation="grow" variant="primary" size="sm" />
      </div>
    </Container>
  )
}

export default Loading
