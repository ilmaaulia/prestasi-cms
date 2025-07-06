import {
  START_FETCHING_ACHIEVEMENTS,
  SUCCESS_FETCHING_ACHIEVEMENTS,
  ERROR_FETCHING_ACHIEVEMENTS,
  SET_KEYWORD,
  SET_PAGE,
  SET_STATUS,
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
  page: 1,
  limit: 5,
  pages: 1,
  status: statuslist.idle,
  status_filter: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case START_FETCHING_ACHIEVEMENTS:
    return { ...state, status: statuslist.process }

  case ERROR_FETCHING_ACHIEVEMENTS:
    return { ...state, status: statuslist.error }

  case SUCCESS_FETCHING_ACHIEVEMENTS:
    return {
      ...state,
      status: statuslist.success,
      data: action.achievements,
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

  case SET_STATUS:
    return {
      ...state,
      status_filter: action.status_filter,
    }
    
  default:
    return state
  }
}

export default reducer
