import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useTypeSelector';
import LoginPage from '../../pages/Login/login.page';
import RegistrationPage from '../../pages/Registration/registration.page';

import './routes.component.scss';

interface IRoutes {
	path: string;
	element: JSX.Element;
}

const privateRoutes: IRoutes[] = [
	{
		path: '/',
		element: <div>Start Page</div>
	},
	{
		path: '/category',
		element: <div>Category Page</div>
	}
];

const guestRoutes: IRoutes[] = [
	{
		path: '/login',
		element: <LoginPage />
	},
	{
		path: '/registration',
		element: <RegistrationPage />
	},
	{
		path: '*',
		element: <Navigate to="/login" />
	}
];

function RoutesComponent() {
	const { isLogin } = useAppSelector((state) => state.user);

	return (
		<div>
			{isLogin ? (
				<Routes>
					{privateRoutes.map(({ path, element }) => (
						<Route path={path} element={element} key={path} />
					))}
				</Routes>
			) : (
				<Routes>
					{guestRoutes.map(({ path, element }) => (
						<Route path={path} element={element} key={path} />
					))}
				</Routes>
			)}
		</div>
	);
}

export default RoutesComponent;
