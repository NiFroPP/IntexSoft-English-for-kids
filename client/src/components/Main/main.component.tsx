import React from 'react';

import { useAppSelector } from '../../hooks/useTypeSelector';
import { getCategory } from '../../store/selectors/index.selector';
import LoadingComponent from '../common/Loading/loading.component';
import RoutesComponent from '../Routes/routes.component';

import './main.component.scss';

function MainComponent() {
	const { isLoading } = useAppSelector(getCategory);

	return (
		<main className="main">
			<div className="main__container">
				{isLoading ? <LoadingComponent /> : <RoutesComponent />}
			</div>
		</main>
	);
}

export default MainComponent;
