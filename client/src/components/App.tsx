import React, { useEffect } from 'react';

import { useActions } from '../hooks/useActions';
import MenuComponent from './Menu/menu.component';
import HeaderComponent from './Header/header.component';
import FooterComponent from './Footer/footer.component';
import MainComponent from './Main/main.component';

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
				<MainComponent />
				<FooterComponent />
			</div>
		</div>
	);
}
