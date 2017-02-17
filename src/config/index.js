/**
 * Created by Jared on 16/3/4.
 */
let config = {

  //dev开发环境
  //接口url    websockit接口    孩子默认头像    孩子头像url    数据统计接口
  baseUrl:'http://api-ptui-apps.ptdev.cn',
  wcUrl:'ws://api-ptui-apps.ptdev.cn',
  defaultAvatar:'http://pico.file.putaocdn.com/file/acac099c9069dd110843ef8d646be15a82e51b28.png',
  userAvatar:'http://account.file.dev.putaocdn.com/file／',
  infoCountUrl:'http://pad-count-server-dev.ptdev.cn',

  //test测试环境
  // baseUrl:'http://pad-server-test.ptdev.cn',
  // wcUrl:'ws://pad-server-test.ptdev.cn',
  // defaultAvatar:'http://paibot.test.fe.ptdev.cn/browser/head_default.png',
  // userAvatar:'http://account.file.dev.putaocdn.com/file/',
  // infoCountUrl:'http://pad-count-server-test.ptdev.cn',

  ////正式环境
  // baseUrl:'//pad-server.putao.com',
  // wcUrl:'ws://pad-server.putao.com',
  // defaultAvatar:'//h5.putao.com/head_default.png',
  // userAvatar:'//weidu.file.putaocdn.com/file／',
  // infoCountUrl: '//pad-count-server.putao.com/',
  isLogin: false,
  token: '',
  uid: '',
  uid_children: '',
  device_id:'',
  appid:'',
  cid:''
}
export default config;
