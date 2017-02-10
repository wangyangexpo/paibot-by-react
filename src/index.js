import 'core-js/fn/object/assign';

import ReactDOM from 'react-dom';
import routers from './router/index.js';
import config from './config';
import utils from './utils';
import FastClick from 'fastclick';

const token = (utils.getQueryString('token') || []).pop();
const uid = (utils.getQueryString('uid') || []).pop();
const uid_children = (utils.getQueryString('uid_children') || []).pop();
const appid = (utils.getQueryString('appid') || []).pop();
const device_id = (utils.getQueryString('device_id') || []).pop();
const cid = (utils.getQueryString('cid') || []).pop();

if(!(token && uid && appid)) {
    alert('参数错误');
} else {
    config.token = token;
    config.uid = uid;
    config.uid_children = uid_children;
    config.appid = appid;
    config.device_id = device_id;
    config.isLogin = true;
    config.cid = cid;
}

FastClick.attach(document.body);

// Render the main component into the dom
ReactDOM.render(routers,document.getElementById('app'));