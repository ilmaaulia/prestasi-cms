import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Breadcrumbs = ({ dashboardUrl, secondLevelText, thirdLevelText, secondLevelUrl }) => {
  const navigate = useNavigate()
  return (
    <Breadcrumb className='mt-4 mb-3'>
      <Breadcrumb.Item onClick={() => navigate(dashboardUrl)}>Dashboard</Breadcrumb.Item>
      {!thirdLevelText && <Breadcrumb.Item active>{secondLevelText}</Breadcrumb.Item>}

      {thirdLevelText && (
        <Breadcrumb.Item onClick={() => navigate(secondLevelUrl)}>
          {secondLevelText}
        </Breadcrumb.Item>
      )}
      {thirdLevelText && <Breadcrumb.Item active>{thirdLevelText}</Breadcrumb.Item>}
    </Breadcrumb>
  )
}

export default Breadcrumbs
