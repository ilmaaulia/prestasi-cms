import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import AlertMessage from '../../../components/AlertMessage'
import LoginForm from './form'
import { postData } from '../../../utils/fetch'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../../redux/auth/actions'

const LoginPage = () => {
  const dispatch = useDispatch()
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
      let res = await postData('/students/signin', form)
      dispatch(
        userLogin(
          res.data.data.token,
          res.data.data.role,
          res.data.data.id,
          res.data.data.refreshToken,
        ),
      )

      setIsLoading(false)
      navigate('/student/dashboard')
    } catch (err) {
      if (err?.response?.status === 403) {
        try {
          const res = await postData('/admin/signin', form)
          dispatch(
            userLogin(
              res.data.data.token,
              res.data.data.role,
              res.data.data.id,
              res.data.data.refreshToken,
            ),
          )

          setIsLoading(false)
          navigate('/admin/dashboard')
        } catch (err) {
          setIsLoading(false)
          setAlert({
            status: true,
            message: err?.response?.data?.msg,
            variant: 'danger',
          })
        }
      } else {
        setIsLoading(false)
        setAlert({
          status: true,
          message: err?.response?.data?.msg,
          variant: 'danger',
        })
      }
    }
  }

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center p-0 bg-light"
    >
      <Row className="w-100 m-0">
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="w-75">
            <img
              className="logo-img mb-5"
              src="../logo-ipi.png"
              alt="Logo IPI"
            />
            <h2 className="fw-bold mb-4">Selamat Datang</h2>
            <p>Silakan masuk untuk melanjutkan</p>

            {alert.status && (
              <AlertMessage message={alert.message} variant={alert.variant} />
            )}

            <LoginForm
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />

            <div className="mt-3 text-center">
              <p>
                Belum punya akun?{' '}
                <Link to="/register" className="text-primary fw-bold">
                  Daftar di sini
                </Link>
              </p>
            </div>
          </div>
        </Col>

        <Col xs={12} md={6} className="d-none d-md-flex vh-100 p-0">
          <Image
            src="../login-banner.jpg"
            alt="Illustration"
            className="img-fluid object-fit-cover rounded-start-4"
          />
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
