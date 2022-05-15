import React from 'react';
import { Navigate } from 'react-router-dom';

import { IRoutes } from '../routes.component';
import PATHS from '../../../models/enum/paths.enum';

import LoginPage from '../../../pages/Login/login.page';
import RegistrationPage from '../../../pages/Registration/registration.page';

export default [
	{
		path: PATHS.LOGIN,
		element: <LoginPage />
	},
	{
		path: PATHS.REGISTRATION,
		element: <RegistrationPage />
	},
	{ path: PATHS.OTHER, element: <Navigate to={PATHS.LOGIN} /> }
] as IRoutes[];
