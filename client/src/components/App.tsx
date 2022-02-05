import React from 'react';

import MenuComponent from './Menu/menu.component';
import HeaderComponent from './Header/header.component';
import RoutesComponent from './Routes/routes.component';
import FooterComponent from './Footer/footer.component';

export default function App() {
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
