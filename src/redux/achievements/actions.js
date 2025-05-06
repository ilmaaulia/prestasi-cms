import {
  START_FETCHING_ACHIEVEMENTS,
  SUCCESS_FETCHING_ACHIEVEMENTS,
  ERROR_FETCHING_ACHIEVEMENTS,
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
  return async (dispatch) => {
    dispatch(startFetchingAchievement())

    try {
      setTimeout(() => {
        dispatch(clearNotif())
      }, 3000)
      
      let res = await debouncedFetchAchievement('/achievements')

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

export {
  startFetchingAchievement,
  successFetchingAchievements,
  errorFetchingAchievements,
  fetchAchievements,
}
