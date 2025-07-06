import {
  START_FETCHING_STUDENTS,
  SUCCESS_FETCHING_STUDENTS,
  ERROR_FETCHING_STUDENTS,
  SET_KEYWORD,
  SET_PAGE,
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
  page: 1,
  limit: 10,
  pages: 1,
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
      pages: action.pages,
    }

  case SET_KEYWORD:
    return {
      ...state,
      keyword: action.keyword,
    }

  case SET_PAGE:
    return {
      ...state,
      page: action.page,
    }  

  default:
    return state
  }
}

export default reducer
