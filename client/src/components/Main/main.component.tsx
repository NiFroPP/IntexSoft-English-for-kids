import React from 'react';

import LoadingComponent from '../common/Loading/loading.component';
import RoutesComponent from '../routes/routes.component';

import './main.component.scss';

function MainComponent() {
	const isLoading = false;

	return (
		<main className="main">
			<div className="main__container">
				{isLoading ? <LoadingComponent /> : <RoutesComponent />}
			</div>
		</main>
	);
}

export default MainComponent;
