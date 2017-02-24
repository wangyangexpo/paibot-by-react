import React from 'react';
import { Router, Route, hashHistory ,IndexRedirect } from 'react-router';
import App from '../components/App';
import Home from '../components/pages/home';
import Loading from '../components/pages/loading';
import Applicationmanage from '../components/pages/applicationmanage';
import Manage from '../components/pages/manage';
import ManageList from '../components/pages/managelist';
import Weekly from '../components/pages/weekly';
import Addweekly from '../components/pages/addweekly'
import Whitelist from '../components/pages/whitelist'
import Recommendlist from '../components/pages/recommendlist'
import Articlelist from '../components/pages/articlelist'
import Articleshow from '../components/pages/articleshow'
import Timeout from '../components/pages/timeout'
import { Provider } from 'react-redux';
import store from '../stores'

var router = (
 	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRedirect to="/home"/>
				<Route name="home" path="home" component={Home}/>
				<Route name="loading" path="loading" component={Loading}/>
				<Route name="applicationmanage" path="applicationmanage" component={Applicationmanage}/>
				<Route name="manage" path="manage" component={Manage}/>
				<Route name="managelist" path="managelist" component={ManageList}/>
				<Route name="weekly" path="weekly" component={Weekly}/>
				<Route name="addweekly" path="addweekly" component={Addweekly}/>
				<Route name="whitelist" path="whitelist" component={Whitelist}/>
				<Route name="recommendlist" path="recommendlist" component={Recommendlist}/>
				<Route name="articlelist" path="articlelist" component={Articlelist}/>
				<Route name="articleshow" path="articleshow" component={Articleshow}/>
				<Route name="timeout" path="timeout" component={Timeout}/>
			</Route>
		</Router>
	</Provider>
)
export default router;