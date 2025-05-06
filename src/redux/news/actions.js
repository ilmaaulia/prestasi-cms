import {
  START_FETCHING_NEWS,
  SUCCESS_FETCHING_NEWS,
  ERROR_FETCHING_NEWS,
} from './constants'

import { getData } from '../../utils/fetch'
import debounce from 'debounce-promise'
import { clearNotif } from '../notif/actions'

let debouncedFetchNews = debounce(getData, 1000)

const startFetchingNews = () => {
  return {
    type: START_FETCHING_NEWS,
  }
}

const successFetchingNews = ({ news }) => {
  return {
    type: SUCCESS_FETCHING_NEWS,
    news,
  }
}

const errorFetchingNews = () => {
  return {
    type: ERROR_FETCHING_NEWS,
  }
}

const fetchNews = () => {
  return async (dispatch) => {
    dispatch(startFetchingNews())

    try {
      setTimeout(() => {
        dispatch(clearNotif())
      }, 3000)
      
      let res = await debouncedFetchNews('/newses')

      dispatch(
        successFetchingNews({
          news: res.data.data,
        }),
      )
    } catch (error) {
      dispatch(errorFetchingNews())
    }
  }
}

export {
  startFetchingNews,
  successFetchingNews,
  errorFetchingNews,
  fetchNews,
}
