import { APPLICATION_ONE_ROUTE, APPLICATION_ROUTE, CABINET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, } from "./utils/consts";
import Login from "./pages/Login"
import Applications from "./pages/Applications";
import ApplicationOne from "./pages/ApplicationOne";
import Cabinet from "./pages/Cabinet"

export const authRoutes = [
	{
		path: APPLICATION_ROUTE,
		Component: Applications
	},
	{
		path: APPLICATION_ONE_ROUTE,
		Component: ApplicationOne
	},
	{
		path: CABINET_ROUTE,
		Component: Cabinet
	}
]

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		Component: Login
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Login
	}
]
