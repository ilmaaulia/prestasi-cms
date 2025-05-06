import {
  START_FETCHING_NEWS,
  SUCCESS_FETCHING_NEWS,
  ERROR_FETCHING_NEWS,
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
  case START_FETCHING_NEWS:
    return { ...state, status: statuslist.process }

  case ERROR_FETCHING_NEWS:
    return { ...state, status: statuslist.error }

  case SUCCESS_FETCHING_NEWS:
    return {
      ...state,
      status: statuslist.success,
      data: action.news,
    }

  default:
    return state
  }
}

export default reducer
