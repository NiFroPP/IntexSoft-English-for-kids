import React from 'react';

import AuthPage from '../pages/auth.page';

interface IRoutes {
	path: string;
	element: JSX.Element;
}

export const routes: IRoutes[] = [
	{ path: '/login', element: <AuthPage /> },
	{
		path: '/',
		element: <div>Start Page</div>
	},
	{
		path: '/category',
		element: <div>Category Page</div>
	}
];
