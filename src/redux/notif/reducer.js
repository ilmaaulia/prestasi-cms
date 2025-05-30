import { CLEAR_NOTIF, SET_NOTIF } from './constants'

let initialState = { status: false, typeNotif: '', message: null }

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_NOTIF:
    return {
      ...state,
      status: action.status,
      typeNotif: action.typeNotif,
      message: action.message,
    }

  case CLEAR_NOTIF:
    return initialState

  default:
    return state
  }
}

export default reducer
