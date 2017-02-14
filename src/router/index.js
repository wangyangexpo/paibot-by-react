import React from 'react';
import { Router, Route, hashHistory ,IndexRedirect } from 'react-router';
import App from '../components/App';
import Home from '../components/pages/home';
import Applicationmanage from '../components/pages/applicationmanage';
import { Provider } from 'react-redux';
import store from '../stores'

var router = (
 	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRedirect to="/home"/>
				<Route path="home" component={Home}/>
				<Route path="applicationmanage" component={Applicationmanage}/>
			</Route>
		</Router>
	</Provider>
)
export default router;