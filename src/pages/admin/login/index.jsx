import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useNavigate, Navigate } from 'react-router-dom'
import AlertMessage from '../../../components/AlertMessage'
import axios from 'axios'
import { config } from '../../../config'
import LoginForm from './form'

function LoginPageAdmin() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const [form, setForm] = React.useState({
    email: '',
    password: '',
  })

  const [alert, setAlert] = React.useState({
    status: false,
    message: '',
    variant: 'danger',
  })

  const [isLoading, setIsLoading] = React.useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const res = await axios.post(
        `${config.api_host_dev}/admin/signin`,
        form,
      )
      localStorage.setItem('token', res.data.data.token)
      setIsLoading(false)
      navigate('/admin/dashboard')
    } catch (error) {
      setIsLoading(false)
      setAlert({
        status: true,
        message: error?.response?.data?.msg || 'Terjadi kesalahan',
        variant: 'danger',
      })
    }
  }

  if (token) return <Navigate to={'/admin/dashboard'} replace={true} />

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center p-0 bg-light">
      <Row className="w-100 m-0">
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <div className="w-75">
            <img className="logo-img mb-5" src="../logo-ipi.png" alt="Logo IPI" />
            <h2 className="fw-bold mb-4">Selamat Datang</h2>
            <p>Silakan masuk untuk melanjutkan</p>

            {alert.status && (
              <AlertMessage
                message={alert.message}
                variant={alert.variant}
              />
            )}

            <LoginForm
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
						
          </div>
        </Col>

        <Col xs={12} md={6} className="d-none d-md-flex vh-100 p-0">
          <Image src="../login-banner.jpg" alt="Illustration" className="img-fluid object-fit-cover rounded-start-4" />
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPageAdmin
