import React from 'react'
import { Card, Badge, Col, Row } from 'react-bootstrap'

const DashboardStats = ({ achievements, getRelevantTags, tagColors }) => {
  return (
    <>
      <Row className="mb-4">
        <Col xs={12} md={4} className="mb-3">
          <Card className="h-100 d-flex flex-column shadow-sm border-0">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>Total Prestasi</Card.Title>
              <Card.Text className="display-4">{achievements.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4} className="mb-3">
          <Card className="h-100 d-flex flex-col</Col>umn shadow-sm border-0">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>Ragam Prestasi Diraih</Card.Title>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {getRelevantTags().length > 0 ? (
                  getRelevantTags().map((tag, i) => (
                    <Badge key={i} bg={tagColors[i % tagColors.length]}>
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted display-5">-</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default DashboardStats
