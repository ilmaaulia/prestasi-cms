import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Form } from 'react-bootstrap'
import TextInputWithLabel from '../../../components/TextInputWithLabel'
import AppButton from '../../../components/Button'
import { putData } from '../../../utils/fetch'
import AlertMessage from '../../../components/AlertMessage'

const OtpPage = () => {
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
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="fw-bold mb-3 text-center">Verifikasi OTP</h3>

        {alert.status && (
          <AlertMessage
            message={alert.message}
            variant={alert.variant}
          />
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
    </Container>
  )
}

export default OtpPage
