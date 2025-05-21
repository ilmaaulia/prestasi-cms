import { USER_LOGIN, USER_LOGOUT } from './constants'

const userLogin = (token, role, id, refreshToken) => ({
  type: USER_LOGIN,
  token,
  refreshToken,
  role,
  id,
})

const userLogout = () => {
  localStorage.removeItem('auth')
  return {
    type: USER_LOGOUT,
  }
}

export { userLogin, userLogout }
