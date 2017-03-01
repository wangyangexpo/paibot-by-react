import fetch from 'isomorphic-fetch'
import config  from '../config';
import subredditConfig  from '../config/subreddit';

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'
export function invalidatesubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

export const REQUEST_SUBREDDIT = 'REQUEST_SUBREDDIT'
function request(subreddit) {
  return {
    type: REQUEST_SUBREDDIT,
    subreddit
  }
}

export const RECEIVE_SUBREDDIT = 'RECEIVE_SUBREDDIT'
function receive(subreddit, json) {
  return {
    type: RECEIVE_SUBREDDIT,
    subreddit,
    response: json,
    receivedTime: Date.now()
  }
}

export function setSubreddit(subreddit) {

  // 如果使用 GET 请求的话放行这段代码
  // let url = '';
  // if(subredditConfig[subreddit.name]) {
  //     url = urlWithParam(subreddit)
  // }else {
  //     return dispatch => {
  //       dispatch(invalidatesubreddit(subreddit))
  //     }
  // }

  let data = Object.assign(subreddit.params || {}, getUserInfo());
  let url = subredditConfig[subreddit.name].setURL;
  let params = 'data=' + JSON.stringify(data) + '&device_id=' + config.device_id;
  // let params = JSON.stringify({
  //   'data': data,
  //   'device_id': config.device_id
  // });

  return dispatch => {
    dispatch(request(subreddit))
    return fetch(url
          ,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': '*'
          },
          body:params
          }
        )
      .then(res => res.json())
      .then(json => dispatch(receive(subreddit, json)))
  }
}

export function fetchIfNeeded(subreddit) {

  return (dispatch, getState) => {
    if (needFetch(getState(), subreddit)) {
      return dispatch(setSubreddit(subreddit))
    } else {
      return Promise.resolve()
    }
  }
}

const needFetch = (state, subreddit) => {
  const subreddit_data = state.setSubreddit[subreddit.name]
  if (!subreddit_data) {
    return true
  } else if (subreddit_data.isFetching) {
    return false
  } else {
    return subreddit_data.didInvalidate
  }
}


// GET请求 给 url 拼接请求参数
// const urlWithParam = (subreddit) => {
//   let data = Object.assign(subreddit.params || {}, getUserInfo());
//   data = JSON.stringify(data);
//   let returnURL = subredditConfig[subreddit.name].setURL;
//   returnURL += '?data=' + data + '&device_id=' + config.device_id;
//   return returnURL;
// }

// 获取 config 配置的信息
const getUserInfo = () => ({
  'uid': config['uid'],
  'token': config['token'],
  'cid':config['cid'],
  'uid_children': config['uid_children'],
  'appid':config['appid']
});


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
