import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const DashboardStats = ({ totalUsers, totalAchievements, totalNews }) => {
  return (
    <Row className="mb-4">
      <Col xs={12} md={4} className="mb-3">
        <Card className="h-100 d-flex flex-column shadow-sm bg-pastel-blue border-0">
          <Card.Body className="d-flex flex-column justify-content-between">
            <Card.Title>Total Pengguna</Card.Title>
            <Card.Text className="display-4">{totalUsers}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4} className="mb-3">
        <Card className="h-100 d-flex flex-column shadow-sm bg-pastel-green border-0">
          <Card.Body className="d-flex flex-column justify-content-between">
            <Card.Title>Total Prestasi</Card.Title>
            <Card.Text className="display-4">{totalAchievements}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4} className="mb-3">
        <Card className="h-100 d-flex flex-column shadow-sm bg-pastel-yellow border-0">
          <Card.Body className="d-flex flex-column justify-content-between">
            <Card.Title>Total Berita</Card.Title>
            <Card.Text className="display-4">{totalNews}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>  
  )
}

export default DashboardStats
