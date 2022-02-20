import React, { useEffect } from 'react';

import { useActions } from '../hooks/useActions';
import MenuComponent from './Menu/menu.component';
import HeaderComponent from './Header/header.component';
import FooterComponent from './Footer/footer.component';
import RoutesComponent from './Routes/routes.component';

export default function App() {
	const { fetchCategories } = useActions();

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div>
			<MenuComponent />
			<div id="page-wrap">
				<HeaderComponent />
				<RoutesComponent />
				<FooterComponent />
			</div>
		</div>
	);
}
