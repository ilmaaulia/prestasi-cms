import {
  START_FETCHING_ACHIEVEMENTS,
  SUCCESS_FETCHING_ACHIEVEMENTS,
  ERROR_FETCHING_ACHIEVEMENTS,
  SET_KEYWORD,
  SET_PAGE,
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

const successFetchingAchievements = ({ achievements, pages }) => {
  return {
    type: SUCCESS_FETCHING_ACHIEVEMENTS,
    achievements,
    pages,
  }
}

const errorFetchingAchievements = () => {
  return {
    type: ERROR_FETCHING_ACHIEVEMENTS,
  }
}

const fetchAchievements = (id) => {
  return async (dispatch, getState) => {
    dispatch(startFetchingAchievement())

    try {
      setTimeout(() => {
        dispatch(clearNotif())
      }, 3000)

      let params = {
        keyword: getState().achievements.keyword,
        page: getState().achievements.page || 1,
        limit: getState().achievements.limit || 5,
      }

      if (id) {
        params.student = id
      }
      
      let res = await debouncedFetchAchievement('/achievements', params)

      res.data.data.data.forEach((res) => {
        if (res.student) {
          res.student_name = `${res.student.firstName} ${res.student.lastName}`
        } else {
          res.student_name = 'Nama mahasiswa tidak ditemukan'
        }
      })

      dispatch(
        successFetchingAchievements({
          achievements: res.data.data.data,
          pages: res.data.data.pages,
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

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  }
}

export {
  startFetchingAchievement,
  successFetchingAchievements,
  errorFetchingAchievements,
  fetchAchievements,
  setKeyword,
  setPage,
}
