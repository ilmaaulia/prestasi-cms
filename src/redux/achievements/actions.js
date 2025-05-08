import {
  START_FETCHING_ACHIEVEMENTS,
  SUCCESS_FETCHING_ACHIEVEMENTS,
  ERROR_FETCHING_ACHIEVEMENTS,
  SET_KEYWORD,
} from './constants'

import { getData } from '../../utils/fetch'
import debounce from 'debounce-promise'
import { clearNotif } from '../notif/actions'

let debouncedFetchAchievement = debounce(getData, 1000)

const startFetchingAchievement = () => {
  return {
    type: START_FETCHING_ACHIEVEMENTS,
  }
}

const successFetchingAchievements = ({ achievements }) => {
  return {
    type: SUCCESS_FETCHING_ACHIEVEMENTS,
    achievements,
  }
}

const errorFetchingAchievements = () => {
  return {
    type: ERROR_FETCHING_ACHIEVEMENTS,
  }
}

const fetchAchievements = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingAchievement())

    try {
      setTimeout(() => {
        dispatch(clearNotif())
      }, 3000)

      let params = {
        keyword: getState().achievements.keyword,
      }
      
      let res = await debouncedFetchAchievement('/achievements', params)

      res.data.data.forEach((res) => {
        if (res.student) {
          res.student_name = `${res.student.firstName} ${res.student.lastName}`
        } else {
          res.student_name = 'Nama mahasiswa tidak ditemukan'
        }
      })

      dispatch(
        successFetchingAchievements({
          achievements: res.data.data,
        }),
      )
    } catch (error) {
      dispatch(errorFetchingAchievements())
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
  startFetchingAchievement,
  successFetchingAchievements,
  errorFetchingAchievements,
  fetchAchievements,
  setKeyword,
}
