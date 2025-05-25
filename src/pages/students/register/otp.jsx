import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Form, Row, Col, Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setNotif } from '../../../redux/notif/actions'
import TextInputWithLabel from '../../../components/TextInputWithLabel'
import AppButton from '../../../components/Button'
import { putData } from '../../../utils/fetch'
import AlertMessage from '../../../components/AlertMessage'

const OtpPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const email = new URLSearchParams(location.search).get('email')

  const [otp, setOtp] = useState('')
  const [alert, setAlert] = useState({
    status: false,
    variant: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      await putData('/students/active', { email, otp })
      navigate('/login')
      dispatch(
        setNotif(true, 'success', 'Akun berhasil diverifikasi, silakan login.'),
      )
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
              className="logo-img mb-4"
              src="../logo-ipi.png"
              alt="Logo IPI"
            />
            <h3 className="fw-bold mb-5">Verifikasi OTP</h3>

            {alert.status && (
              <AlertMessage message={alert.message} variant={alert.variant} />
            )}

            <Form>
              <TextInputWithLabel
                label="Kode OTP"
                placeholder="Masukkan kode OTP"
                name="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <AppButton
                loading={isLoading}
                disabled={isLoading}
                action={handleSubmit}
                variant="primary"
                className="w-100 mt-3"
              >
                Verifikasi
              </AppButton>
            </Form>

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

export default OtpPage
