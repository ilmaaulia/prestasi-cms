import {
  START_FETCHING_STUDENTS,
  SUCCESS_FETCHING_STUDENTS,
  ERROR_FETCHING_STUDENTS,
  SET_KEYWORD,
} from './constants'

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
}

const initialState = {
  data: [],
  keyword: '',
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

  case SET_KEYWORD:
    return {
      ...state,
      keyword: action.keyword,
    }

  default:
    return state
  }
}

export default reducer
