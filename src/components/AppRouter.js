import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { APPLICATION_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
	const { user } = useContext(Context)
	console.log(user.isAuth)
	return (
		<Switch>
			{user.isAuth && authRoutes.map(({ path, Component }) =>
				<Route key={path} path={path} component={Component} exact />
			)}
			{publicRoutes.map(({ path, Component }) =>
				<Route key={path} path={path} component={Component} exact />
			)}
			<Redirect to={user.isAuth ? APPLICATION_ROUTE : LOGIN_ROUTE} />
		</Switch>
	);
});


export default AppRouter;