import { combineReducers } from 'redux'

import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS,
  INVALID_USER_INFO, REQUEST_USER_INFO, RECEIVE_USER_INFO,
  SHOW_LOADING, HIDE_LOADING
} from '../actions'

function selectedsubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

function setUserInfo(state = {
  isFetching: false,
  didInvalid: false,
  userInfo: {}
}, action) {
  switch (action.type) {
    case INVALID_USER_INFO:
      return Object.assign({}, state, {
        didInvalid: true
      })
    case REQUEST_USER_INFO:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalid: false
      })
    case RECEIVE_USER_INFO:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalid: false,
        userInfo: action.response, // action.response = {http_status_code: 200, data: [...]}
        lastUpdated: action.receivedAt
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
  postsBySubreddit,
  selectedsubreddit,
  setUserInfo,
  loading
})

export default rootReducer