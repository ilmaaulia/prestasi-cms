import { USER_LOGIN, USER_LOGOUT } from './constants'

const userLogin = (token, role) => ({
  type: USER_LOGIN,
  token,
  role,
})

const userLogout = () => {
  localStorage.removeItem('auth')
  return {
    type: USER_LOGOUT,
  }
}

export {
  userLogin,
  userLogout,
}
