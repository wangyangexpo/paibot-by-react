// 这个文件是 各个subreddit的 ajax请求信息
import config  from './index';

const baseUrl = config.baseUrl;
const infoCountUrl = config.infoCountUrl;

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
	},
	'appScaleInfo': {
		name: 'appScaleInfo',
		setURL: infoCountUrl + '/DataCenter/AppData/getUserScale',
		getURL: infoCountUrl + '/DataCenter/AppData/getUserScale',
		params: {}
	},
	'multiVariateInfo': {
		name: 'multiVariateInfo',
		setURL: baseUrl + '/assistant/AppManage/getMultivariate2',
		getURL: baseUrl + '/assistant/AppManage/getMultivariate2',
		params: {}
	},
	'manageStudyInfo': {
		name: 'manageStudyInfo',
		setURL: baseUrl + '/assistant/AppManage/showManageStudyStatus',
		getURL: baseUrl + '/assistant/AppManage/showManageStudyStatus',
		params: {}
	},
	'manageInfo': {
		name: 'manageInfo',
		setURL: baseUrl + '/assistant/AppManage/updateManageModel',
		getURL: baseUrl + '/assistant/AppManage/updateManageModel',
		params: {}
	},
	'studyInfo': {
		name: 'studyInfo',
		setURL: baseUrl + '/assistant/AppManage/updateStudyModel',
		getURL: baseUrl + '/assistant/AppManage/updateStudyModel',
		params: {}
	},
	'childInfo': {
		name: 'childInfo',
		setURL: baseUrl + '/user/device/getDeviceInfo',
		getURL: baseUrl + '/user/device/getDeviceInfo',
		params: {}
	},
	'manageModelApps': {
		name: 'manageModelApps',
		setURL: baseUrl + '/assistant/AppManage/showManageModelApp',
		getURL: baseUrl + '/assistant/AppManage/showManageModelApp',
		params: {}
	}
}

export default subreddits;