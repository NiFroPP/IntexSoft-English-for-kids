import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useTypeSelector';
import PATHS from '../../models/enum/paths.enum';
import LoginPage from '../../pages/Login/login.page';
import RegistrationPage from '../../pages/Registration/registration.page';
import AboutPage from '../../pages/About/about.page';
import CategoriesPage from '../../pages/Categories/categories.page';
import CategoryPage from '../../pages/Category/category.page';
import LoadingComponent from '../common/Loading/loading.component';

import './routes.component.scss';

interface IRoutes {
	path: string;
	element: JSX.Element;
}

const privateRoutes: IRoutes[] = [
	{
		path: PATHS.ABOUT,
		element: <AboutPage />
	},
	{
		path: PATHS.CATEGORY,
		element: <CategoriesPage />
	},
	{
		path: `${PATHS.CATEGORY}/:id`,
		element: <CategoryPage />
	}
];

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

function RoutesComponent() {
	const { isLogin } = useAppSelector((state) => state.user);

	return (
		// {isLoading ? <LoadingComponent /> : <RoutesComponent />}

		<main className="main">
			<div className="main__container">
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
		</main>
	);
}

export default RoutesComponent;
