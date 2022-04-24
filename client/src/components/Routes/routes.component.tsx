import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useTypeSelector';
import { getUser } from '../../store/selectors/index.selector';
import PATHS from '../../models/enum/paths.enum';

import {
	adminRoutes,
	privateRoutes
} from './PrivateRoutes/private-routes.component';
import guestRoutes from './GuestRoutes/guest-routes.component';

import './routes.component.scss';

export interface IRoutes {
	path: string;
	element: JSX.Element;
}

function IsLoginOutlet() {
	const { isLogin } = useAppSelector(getUser);
	return isLogin ? <Outlet /> : <Navigate to={PATHS.LOGIN} />;
}

function IsAdminOutlet() {
	const { isAdmin } = useAppSelector(getUser);
	return isAdmin ? <Outlet /> : <Navigate to={PATHS.CATEGORY} />;
}

function RoutesComponent() {
	return (
		<main className="main">
			<div className="main__container">
				<Routes>
					{guestRoutes.map(({ path, element }) => (
						<Route path={path} element={element} key={path} />
					))}

					<Route path="/" element={<IsLoginOutlet />}>
						<Route path={PATHS.ADMIN_PANEL} element={<IsAdminOutlet />}>
							{adminRoutes.map(({ path, element }) => (
								<Route path={path} element={element} key={path} />
							))}
						</Route>

						{privateRoutes.map(({ path, element }) => (
							<Route path={path} element={element} key={path} />
						))}
					</Route>
				</Routes>
			</div>
		</main>
	);
}

export default RoutesComponent;
