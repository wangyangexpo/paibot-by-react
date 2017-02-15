import fetch from 'isomorphic-fetch'
import config  from '../config';

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function invalidatesubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {

  /* 注意这个函数也接收了 getState() 方法
   * 它让你选择接下来 dispatch 什么。
   * 当缓存的值是可用时，
   * 减少网络请求很有用。*/

  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      // 在 thunk 里 dispatch 另一个 thunk！
      return dispatch(fetchPosts(subreddit))
    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve()
    }
  }
}

//===================== 业务 action ===================

const getUserInfo = () => ({
  uid: config['uid'],
  token: config['token'],
  cid:config['cid'],
  uid_children: config['uid_children'],
  appid:config['appid']
});

// 设置userInfo的异步action
export const INVALID_USER_INFO = 'INVALID_USER_INFO'

export function invalidUserInfo(userInfo) {
  return {
    type: INVALID_USER_INFO,
    userInfo
  }
}

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'

export function setUserInfo(data) {

  let datas = Object.assign(data, getUserInfo());
  let post_data = JSON.stringify(datas);

  return dispatch => {
    dispatch({
      type: REQUEST_USER_INFO
    })
    return fetch(config.baseUrl+'/assistant/Protection/setInfoUse?data=' + post_data + '&device_id=' + config.device_id)
      .then(res => res.json())
      .then(data => dispatch({
          type: RECEIVE_USER_INFO,
          response: data, // data = {http_status_code: 200, data: [...]}
          receivedAt: Date.now()
        })
      )
  }

}

// loading 加载中

export const SHOW_LOADING = 'SHOW_LOADING'
export const HIDE_LOADING = 'HIDE_LOADING'

export function loading(bool, text) {

  return {
    type: bool ? SHOW_LOADING : HIDE_LOADING,
    loading: bool,
    loadingText: text
  }
}

