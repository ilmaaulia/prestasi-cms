import axios from 'axios'
import { config } from '../config'

const handleError = (error) => {
  const originalRequest = error.config
  if (error?.response?.data?.msg === 'jwt expired') {
    originalRequest._retry = true
    const session = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {}

    return axios
      .get(`${config.api_host_prod}/refresh-token/${session.refreshToken}`)
      .then((res) => {
        localStorage.setItem(
          'auth',
          JSON.stringify({
            ...session,
            token: res.data.data.token,
          }),
        )
        originalRequest.headers.Authorization = `Bearer ${res.data.data.token}`
        return axios(originalRequest)
      })
      .catch((err) => {
        console.error('Refresh token failed:', err?.response?.data || err)
        if (err?.response?.data?.msg === 'jwt expired') {
          window.location.href = '/login'
          localStorage.removeItem('auth')
        }
        throw err
      })
  }
  return Promise.reject(error)
}

export default handleError
