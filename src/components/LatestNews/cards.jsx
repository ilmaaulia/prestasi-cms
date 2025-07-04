import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'
import truncate from 'html-truncate'

const Cards = ({ data, title }) => {
  const navigate = useNavigate()

  return (
    <>
      <h2 className="mb-4">{title}</h2>
      {data && data.length > 0 ? (
        <Row>
          {data.map((data) => (
            <Col key={data._id} xs={12} sm={6} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm h-100" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <Card.Img
                  variant="top"
                  src={data.image?.name}
                  alt={data.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title
                    onClick={() => navigate('/student/dashboard')}
                    style={{ cursor: 'pointer' }}
                  >
                    {data.title && truncate(data.title, 40)}
                  </Card.Title>
                  <Card.Text>
                    <span
                      dangerouslySetInnerHTML={{ __html: truncate(data.content, 80) }}
                    />
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{new Date(data.createdAt).toLocaleDateString()}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">Tidak Ditemukan Data</p>
      )}
    </>
  )
}

export default Cards
