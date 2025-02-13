import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Breadcrumbs = ({ textSecond, textThird, urlSecond }) => {

  const navigate = useNavigate()
  return (
    <Breadcrumb className='mt-4 mb-3'>
      <Breadcrumb.Item onClick={() => navigate('/admin/dashboard')}>Dashboard</Breadcrumb.Item>
      {!textThird && <Breadcrumb.Item active>{textSecond}</Breadcrumb.Item>}

      {textThird && (
        <Breadcrumb.Item onClick={() => navigate(urlSecond)}>
          {textSecond}
        </Breadcrumb.Item>
      )}
      {textThird && <Breadcrumb.Item active>{textThird}</Breadcrumb.Item>}
    </Breadcrumb>
  )
}

export default Breadcrumbs
