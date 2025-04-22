import React, { useState } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AlertMessage from '../../../components/AlertMessage'
import RegisterForm from './form'
import { useNavigate } from 'react-router-dom'
import { postData } from '../../../utils/fetch'

const StudentSignupPage = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    student_id: '',
    study_program: '',
    email: '',
    password: '',
  })

  const [alert, setAlert] = useState({
    status: false,
    variant: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    const key = name === 'studentId' ? 'student_id' : name
    setForm({
      ...form,
      [key]: value,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      await postData('/students/signup', form)
      navigate('/register')
    } catch (err) {
      setAlert({
        status: true,
        variant: 'danger',
        message: err?.response?.data?.msg,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center p-0 bg-light">
      <Row className="w-100 m-0">
        <Col xs={12} md={7} className="d-flex align-items-center justify-content-center">
          <div className="w-75" style={{ maxWidth: '500px' }}>
            <img
              className="logo-img mb-4"
              src="../logo-ipi.png"
              alt="Logo IPI"
              style={{ maxWidth: '150px', height: 'auto' }}
            />
            <h3 className="fw-bold mb-3" style={{ fontSize: '1.5rem' }}>Registrasi Mahasiswa</h3>

            {alert.status && (
              <AlertMessage
                message={alert.message}
                variant={alert.variant}
              />
            )}

            <RegisterForm
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />

            <div className="mt-3 text-center">
              <p style={{ fontSize: '0.9rem' }}>
								Sudah punya akun? <Link to="/login" className="text-primary fw-bold">Masuk di sini</Link>
              </p>
            </div>
          </div>
        </Col>

        <Col xs={12} md={5} className="d-none d-md-flex vh-100 p-0">
          <Image
            src="../login-banner.jpg"
            alt="Illustration"
            className="img-fluid object-fit-cover rounded-start-4"
            style={{ maxHeight: '100%' }}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default StudentSignupPage
