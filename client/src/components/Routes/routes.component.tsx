import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useTypeSelector';
import { getUser } from '../../store/selectors/index.selector';
import PATHS from '../../models/enum/paths.enum';

import LoginPage from '../../pages/Login/login.page';
import RegistrationPage from '../../pages/Registration/registration.page';
import AboutPage from '../../pages/About/about.page';
import CategoriesPage from '../../pages/Categories/categories.page';
import CategoryPage from '../../pages/Category/category.page';
import UserSettingPage from '../../pages/User_Setting/userSetting.page';

import './routes.component.scss';
import WordsPage from '../../pages/All_Words/words.page';

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
	},
	{
		path: PATHS.USER_SETTING,
		element: <UserSettingPage />
	},
	{
		path: PATHS.WORDS,
		element: <WordsPage />
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
	const { isLogin } = useAppSelector(getUser);

	return (
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
