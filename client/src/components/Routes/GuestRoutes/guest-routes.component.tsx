import React from 'react';

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
	}
] as IRoutes[];
