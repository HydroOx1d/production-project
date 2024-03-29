import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppRouteProps, routeConfig } from "shared/config/routeConfig/routeConfig";
import { PageLoader } from "widgets/PageLoader";
import RequiredAuth from "./RequiredAuth";

export const AppRouter = React.memo(function AppRouter() {

	const routeWrapper = React.useCallback(({path, element, onlyAuth}: AppRouteProps) => {

		return (
			<Route key={path} path={path} element={onlyAuth ? <RequiredAuth>{element}</RequiredAuth> : element}/>
		);
	}, []);

	return (
		<React.Suspense fallback={<PageLoader/>}>
			<Routes>
				{routeConfig.map(routeWrapper)}
			</Routes>
		</React.Suspense>
	);
});
