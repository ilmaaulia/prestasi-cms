import { USER_LOGIN, USER_LOGOUT } from './constants'

let initialState = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : { token: null, role: null, id: null }

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      token: action.token,
      role: action.role,
      id: action.id,
    }

  case USER_LOGOUT:
    return { token: null, role: null, id: null }

  default:
    return state
  }
}

export default reducer
