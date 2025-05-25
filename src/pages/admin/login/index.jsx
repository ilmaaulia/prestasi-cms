import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import AlertMessage from '../../../components/AlertMessage'
import LoginForm from './form'
import { postData } from '../../../utils/fetch'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../../redux/auth/actions'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notif = useSelector((state) => state.notif)

  const [form, setForm] = React.useState({
    email: '',
    password: '',
  })

  const [alert, setAlert] = React.useState({
    status: false,
    message: '',
    variant: '',
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
      className="min-vh-100 d-flex p-0 bg-light"
    >
      <Row className="w-100 m-0">
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="w-md-75 w-100 px-3 px-md-0">
            <img
              className="logo-img mb-5"
              src="../logo-ipi.png"
              alt="Logo IPI"
            />
            <h3 className="fw-bold mb-3">Selamat Datang</h3>
            <p className="mb-5">Silakan masuk untuk melanjutkan</p>

            {alert.status && (
              <AlertMessage message={alert.message} variant={alert.variant} />
            )}

            {notif.status && (
              <AlertMessage message={notif.message} variant={notif.typeNotif} />
            )}

            <LoginForm
              form={form}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />

            <div className="mt-3 text-center">
              <p>
                Belum punya akun? {' '}
                <Link to="/register" className="text-primary fw-bold">
                  Daftar di sini
                </Link>
              </p>
            </div>
          </div>
        </Col>

        <Col xs={12} md={6} className="d-none d-md-flex vh-100 p-2">
          <Image
            src="../login-banner.jpg"
            alt="Illustration"
            className="w-100 h-100 object-fit-cover rounded-4"
          />
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
