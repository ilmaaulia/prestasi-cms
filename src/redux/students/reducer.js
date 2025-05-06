import {
  START_FETCHING_STUDENTS,
  SUCCESS_FETCHING_STUDENTS,
  ERROR_FETCHING_STUDENTS,
} from './constants'

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
}

const initialState = {
  data: [],
  status: statuslist.idle,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case START_FETCHING_STUDENTS:
    return { ...state, status: statuslist.process }

  case ERROR_FETCHING_STUDENTS:
    return { ...state, status: statuslist.error }

  case SUCCESS_FETCHING_STUDENTS:
    return {
      ...state,
      status: statuslist.success,
      data: action.students,
    }

  default:
    return state
  }
}

export default reducer
