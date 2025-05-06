import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux'

import { thunk } from 'redux-thunk'
import authReducer from './auth/reducer'
import achievementsReducer from './achievements/reducer'
import newsReducer from './news/reducer'
import usersReducer from './users/reducer'
import notifReducer from './notif/reducer'

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducers = combineReducers({
  auth: authReducer,
  achievements: achievementsReducer,
  news: newsReducer,
  students: usersReducer,
  notif: notifReducer,
})

const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk)),
)

export default store
