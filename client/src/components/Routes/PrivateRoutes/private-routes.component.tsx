import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAppSelector } from '../../../hooks/useTypeSelector';
import { getUser } from '../../../store/selectors/index.selector';
import { IRoutes } from '../routes.component';
import PATHS from '../../../models/enum/paths.enum';

import AboutPage from '../../../pages/About/about.page';
import CategoriesPage from '../../../pages/Categories/categories.page';
import CategoryPage from '../../../pages/Category/category.page';
import AdminPanelPage from '../../../pages/AdminPanel/admin-panel.page';
import CreateCategoryPage from '../../../pages/AdminPanel/CreateCategory/create-category.page';
import UpdateCategoryPage from '../../../pages/AdminPanel/UpdateCategory/update-category.page';
import DeleteCategoryPage from '../../../pages/AdminPanel/DeleteCategory/delete-category.page';
import CreateWordPage from '../../../pages/AdminPanel/CreateWord/create-word.page';
import UpdateWordPage from '../../../pages/AdminPanel/UpdateWord/update-word.page';
import DeleteWordPage from '../../../pages/AdminPanel/DeleteWord/delete-word.page';
import WordsPage from '../../../pages/AllWords/words.page';

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
		path: PATHS.WORDS,
		element: <WordsPage />
	}
];

const adminRoutes: IRoutes[] = [
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
	}
];

function PrivateRoutes() {
	const { isAdmin } = useAppSelector(getUser);

	return (
		<div className="main__container">
			<Routes>
				{privateRoutes.map(({ path, element }) => (
					<Route path={path} element={element} key={path} />
				))}
			</Routes>

			{isAdmin && (
				<Routes>
					{adminRoutes.map(({ path, element }) => (
						<Route path={path} element={element} key={path} />
					))}
				</Routes>
			)}
		</div>
	);
}

export default PrivateRoutes;
