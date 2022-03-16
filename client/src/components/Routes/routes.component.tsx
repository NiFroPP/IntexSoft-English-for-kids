import React from 'react';

import { useAppSelector } from '../../hooks/useTypeSelector';
import { getUser } from '../../store/selectors/index.selector';

import PrivateRoutes from './PrivateRoutes/private-routes.component';
import GuestRoutes from './GuestRoutes/guest-routes.component';

import './routes.component.scss';

export interface IRoutes {
	path: string;
	element: JSX.Element;
}

function RoutesComponent() {
	const { isLogin } = useAppSelector(getUser);

	return (
		<main className="main">
			{isLogin ? <PrivateRoutes /> : <GuestRoutes />}
		</main>
	);
}

export default RoutesComponent;
