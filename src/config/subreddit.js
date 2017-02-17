// 这个文件是 各个subreddit的 ajax请求信息
import config  from './index';

const baseUrl = config.baseUrl;

let subreddits = {
	'protectInfo': {
		name: 'protectInfo',
		setURL: baseUrl + '/assistant/Protection/setInfoUse',
		getURL: baseUrl + '/assistant/Protection/getInfoUse',
		params: {}
	},
	'lockingInfo': {
		name: 'lockingInfo',
		setURL: baseUrl + '/assistant/Protection/setInfoLock',
		getURL: baseUrl + '/assistant/Protection/getInfoLock',
		params: {}
	},
	'homeInfo': {
		name: 'homeInfo',
		setURL: baseUrl + '/assistant/Protection/getProtections',
		getURL: baseUrl + '/assistant/Protection/getProtections',
		params: {}
	}
}

export default subreddits;