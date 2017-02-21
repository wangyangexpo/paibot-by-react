import React from 'react';
import { Router, Route, hashHistory ,IndexRedirect } from 'react-router';
import App from '../components/App';
import Home from '../components/pages/home';
import Loading from '../components/pages/loading';
import Applicationmanage from '../components/pages/applicationmanage';
import Manage from '../components/pages/manage';
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
			</Route>
		</Router>
	</Provider>
)
export default router;