import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { IRoutes } from '../routes.component';
import PATHS from '../../../models/enum/paths.enum';

import LoginPage from '../../../pages/Login/login.page';
import RegistrationPage from '../../../pages/Registration/registration.page';

const guestRoutes: IRoutes[] = [
	{
		path: PATHS.LOGIN,
		element: <LoginPage />
	},
	{
		path: PATHS.REGISTRATION,
		element: <RegistrationPage />
	},
	{
		path: PATHS.OTHER,
		element: <Navigate to={PATHS.LOGIN} />
	}
];

function GuestRoutes() {
	return (
		<div className="main__container">
			<Routes>
				{guestRoutes.map(({ path, element }) => (
					<Route path={path} element={element} key={path} />
				))}
			</Routes>
		</div>
	);
}

export default GuestRoutes;
