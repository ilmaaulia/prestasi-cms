import {
  START_FETCHING_STUDENTS,
  SUCCESS_FETCHING_STUDENTS,
  ERROR_FETCHING_STUDENTS,
  SET_KEYWORD,
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

const successFetchingStudents = ({ students }) => {
  return {
    type: SUCCESS_FETCHING_STUDENTS,
    students,
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
      }
      
      let res = await debouncedFetchStudents('/students', params)

      dispatch(
        successFetchingStudents({
          students: res.data.data,
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

export {
  startFetchingStudents,
  successFetchingStudents,
  errorFetchingStudents,
  fetchStudents,
  setKeyword,
}
