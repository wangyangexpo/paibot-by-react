import { combineReducers } from 'redux'

import {
  INVALID_SUBREDDIT,
  REQUEST_SUBREDDIT, RECEIVE_SUBREDDIT,
  SHOW_LOADING, HIDE_LOADING
} from '../actions'

function processSets(state = {
  isFetching: false,
  invalid: false,
  http_status_code: '',
  response_message: '',
  response_data: {}
}, action) {
  switch (action.type) {
    case INVALID_SUBREDDIT:
      return Object.assign({}, state, {
        invalid: true
      })
    case REQUEST_SUBREDDIT:
      return Object.assign({}, state, {
        isFetching: true,
        invalid: false,
        http_status_code: '',
        response_message: ''
      })
    case RECEIVE_SUBREDDIT:
      return Object.assign({}, state, {
        isFetching: false,
        invalid: false,
        response_status: action.response.http_status_code || action.response.http_code,
        response_message: action.response.msg,
        response_data: action.response.data,
        lastUpdated: action.receivedTime
      })
    default:
      return state
  }
}

function setSubreddit(state = {}, action) {
  switch (action.type) {
    case INVALID_SUBREDDIT:
    case RECEIVE_SUBREDDIT:
    case REQUEST_SUBREDDIT:
      return Object.assign({}, state, {
        [action.subreddit.name]: processSets(state[action.subreddit.name], action)
      })
    default:
      return state
  }
}

function loading(state = {
  isLoading: false,
  loadingText: '加载中'
}, action) {
  switch (action.type) {
    case SHOW_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
        loadingText: action.loadingText ? action.loadingText : '加载中'
      })
    case HIDE_LOADING:
      return Object.assign({}, state, {
        isLoading: false,
        loadingText: '加载中'
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  setSubreddit,
  loading
})

export default rootReducer