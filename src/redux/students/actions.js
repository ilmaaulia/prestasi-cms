import {
  START_FETCHING_STUDENTS,
  SUCCESS_FETCHING_STUDENTS,
  ERROR_FETCHING_STUDENTS,
} from './constants'

import { getData } from '../../utils/fetch'
import debounce from 'debounce-promise'
import { clearNotif } from '../notif/actions'

let debouncedFetchStudents = debounce(getData, 1000)

const startFetchingStudents = () => {
  console.log('Action: START_FETCHING_STUDENTS')
  return {
    type: START_FETCHING_STUDENTS,
  }
}

const successFetchingStudents = ({ students }) => {
  console.log('Action: SUCCESS_FETCHING_STUDENTS', students)
  return {
    type: SUCCESS_FETCHING_STUDENTS,
    students,
  }
}

const errorFetchingStudents = () => {
  console.log('Action: ERROR_FETCHING_STUDENTS')
  return {
    type: ERROR_FETCHING_STUDENTS,
  }
}

const fetchStudents = () => {
  return async (dispatch) => {
    console.log('Fetching students started...')
    dispatch(startFetchingStudents())

    try {
      setTimeout(() => {
        console.log('Clearing notifications...')
        dispatch(clearNotif())
      }, 3000)
      
      let res = await debouncedFetchStudents('/students')
      console.log('Fetch successful:', res.data.data)

      dispatch(
        successFetchingStudents({
          students: res.data.data,
        }),
      )
    } catch (error) {
      console.error('Error fetching students:', error)
      dispatch(errorFetchingStudents())
    }
  }
}

export {
  startFetchingStudents,
  successFetchingStudents,
  errorFetchingStudents,
  fetchStudents,
}
