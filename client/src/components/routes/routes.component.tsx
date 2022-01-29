import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { routes } from '../routes';
import LoadingComponent from '../common/Loading/loading.component';

import './routes.component.scss';

export default function RoutesComponent() {
	const isLoading = false;

	return (
		<main className="main">
			<div className="main__container">
				{isLoading ? (
					<LoadingComponent />
				) : (
					<Routes>
						{routes.map(({ path, element }) => (
							<Route path={path} element={element} key={path} />
						))}
					</Routes>
				)}
			</div>
		</main>
	);
}
