import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card, Row, Col, Image, ListGroup } from 'react-bootstrap'
import { FaUserGraduate, FaBook, FaEnvelope, FaAward, FaFrown } from 'react-icons/fa'
import { clearNotif } from '../../../redux/notif/actions'
import { getData } from '../../../utils/fetch'
import Breadcrumbs from '../../../components/Breadcrumbs'
import AlertMessage from '../../../components/AlertMessage'
import Loading from '../../../components/Loading'
import AppButton from '../../../components/Button'

const StudentProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const id = useSelector((state) => state.auth?.id)
  const notif = useSelector((state) => state.notif)

  const [student, setStudent] = useState(null)

  useEffect(() => {
    if (id) {
      navigate(`/student/profile/${id}`)
    }
  }, [id, navigate])

  const fetchOneStudent = async () => {
    const res = await getData(`/students/${id}`)
    setStudent(res.data.data)
  }

  useEffect(() => {
    fetchOneStudent()
  }, [])

  useEffect(() => {
    if (notif.status) {
      const timer = setTimeout(() => {
        dispatch(clearNotif())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notif, dispatch])

  return (
    <>
      <Breadcrumbs
        dashboardUrl='/student/dashboard'
        secondLevelText='Profil'
      />
      {notif.status && (
        <AlertMessage variant={notif.typeNotif} message={notif.message} />
      )}
      <Row className="mt-4">
        <Col className="d-flex justify-content-end">
          <AppButton
            action={() => navigate(`/student/profile/${id}/edit`)}
          >
            Edit Profil
          </AppButton>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={5}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="text-center">
                {student ? (
                  <>
                    <Image
                      src={student.image?.name}
                      alt="Foto Profil"
                      roundedCircle
                      style={{ width: '150px', height: '150px', objectFit: 'cover'}}
                    />
                    <h2 className="mt-3 text-primary">{`${student.firstName} ${student.lastName}`}</h2>
                  </>
                ) : (
                  <Loading />
                )}
              </div>
              {student && (
                <ListGroup variant="flush" className="mt-3">
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaUserGraduate className="me-3 text-secondary" /> {student.student_id}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaBook className="me-3 text-secondary" /> {student.study_program}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center" style={{ wordBreak: 'break-word' }}>
                    <FaEnvelope className="me-3 text-secondary" /> {student.email}
                  </ListGroup.Item>
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={7}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="text-primary">
                Prestasi
              </Card.Title>
              {student ? (
                student.achievements?.length > 0 ? (
                  <ListGroup variant="flush">
                    {student.achievements.map((achievement, index) => (
                      <ListGroup.Item key={index} className="d-flex align-items-center">
                        <FaAward className="me-3 text-secondary" /> {achievement.name || 'Prestasi tidak diketahui'}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <p className="text-muted">
                    <FaFrown className="me-2 text-secondary" /> Kamu belum punya prestasi.
                  </p>
                )
              ) : (
                <Loading />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default StudentProfilePage
