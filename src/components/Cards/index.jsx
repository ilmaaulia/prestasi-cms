import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { config } from '../../config'

const Cards = ({ data, title }) => {
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
                  src={`${config.image_base_url}/${data.image?.name}`}
                  alt={data.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Text>
                    {data.content.length > 50 ? `${data.content.slice(0, 50)}...` : data.content}
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
        <p className="text-center text-muted">Data tidak tersedia.</p>
      )}
    </>
  )
}

export default Cards
