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
import AdminPanelPage from '../../pages/Admin_panel/adminPanel.page';
import CreateCategoryPage from '../../pages/Admin_panel/Create_category/createCategory.page';
import UpdateCategoryPage from '../../pages/Admin_panel/Update_category/updateCategory.page';
import DeleteCategoryPage from '../../pages/Admin_panel/Delete_category/deleteCategory.page';
import CreateWordPage from '../../pages/Admin_panel/Create_word/createWord.page';
import UpdateWordPage from '../../pages/Admin_panel/Update_word/updateWord.page';
import DeleteWordPage from '../../pages/Admin_panel/Delete_word/deleteWord.page';
import WordsPage from '../../pages/All_Words/words.page';

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
	},
	{
		path: PATHS.ADMIN_PANEL,
		element: <AdminPanelPage />
	},
	{
		path: PATHS.ADMIN_PANEL__CREATE_CATEGORY,
		element: <CreateCategoryPage />
	},
	{
		path: PATHS.ADMIN_PANEL__UPDATE_CATEGORY,
		element: <UpdateCategoryPage />
	},
	{
		path: PATHS.ADMIN_PANEL__DELETE_CATEGORY,
		element: <DeleteCategoryPage />
	},
	{
		path: PATHS.ADMIN_PANEL__CREATE_WORD,
		element: <CreateWordPage />
	},
	{
		path: PATHS.ADMIN_PANEL__UPDATE_WORD,
		element: <UpdateWordPage />
	},
	{
		path: PATHS.ADMIN_PANEL__DELETE_WORD,
		element: <DeleteWordPage />
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
