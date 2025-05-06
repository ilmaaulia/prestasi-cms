import { CLEAR_NOTIF, SET_NOTIF } from './constants'

const setNotif = (status, typeNotif, message) => ({
  type: SET_NOTIF,
  status,
  typeNotif,
  message,
})

const clearNotif = () => ({
  type: CLEAR_NOTIF,
})

export { setNotif, clearNotif }
