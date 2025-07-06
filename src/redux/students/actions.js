import {
  START_FETCHING_STUDENTS,
  SUCCESS_FETCHING_STUDENTS,
  ERROR_FETCHING_STUDENTS,
  SET_KEYWORD,
  SET_PAGE,
} from './constants'

import { getData } from '../../utils/fetch'
import debounce from 'debounce-promise'
import { clearNotif } from '../notif/actions'

let debouncedFetchStudents = debounce(getData, 1000)

const startFetchingStudents = () => {
  return {
    type: START_FETCHING_STUDENTS,
  }
}

const successFetchingStudents = ({ students, pages }) => {
  return {
    type: SUCCESS_FETCHING_STUDENTS,
    students,
    pages,
  }
}

const errorFetchingStudents = () => {
  return {
    type: ERROR_FETCHING_STUDENTS,
  }
}

const fetchStudents = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingStudents())

    try {
      setTimeout(() => {
        dispatch(clearNotif())
      }, 3000)

      let params = {
        keyword: getState().students.keyword,
        page: getState().students.page || 1,
        limit: getState().students.limit || 10,
      }
      
      let res = await debouncedFetchStudents('/students', params)

      dispatch(
        successFetchingStudents({
          students: res.data.data.data,
          pages: res.data.data.pages,
        }),
      )
    } catch (error) {
      dispatch(errorFetchingStudents())
    }
  }
}

const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  }
}

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  }
}

export {
  startFetchingStudents,
  successFetchingStudents,
  errorFetchingStudents,
  fetchStudents,
  setKeyword,
  setPage,
}
