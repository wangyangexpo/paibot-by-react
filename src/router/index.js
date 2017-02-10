import React from 'react';
import { Router, Route, hashHistory ,IndexRedirect } from 'react-router';
import App from '../components/App';
import Home from '../components/pages/home';
import Applicationmanage from '../components/pages/applicationmanage';


var router = (
<Router history={hashHistory}>
	<Route path="/" component={App}>
		<IndexRedirect to="/home"/>
		<Route path="home" component={Home}/>
		<Route path="applicationmanage" component={Applicationmanage}/>
	</Route>
</Router>
)
export default router;