import React from 'react';

import HeaderComponent from './Header/header.component';
import RoutesComponent from './routes/routes.component';
import FooterComponent from './Footer/footer.component';
import MenuComponent from './Menu/menu.component';

export interface Item {
	value: string;
	href: string;
}

export default function App() {
	const items: Item[] = [
		{ value: '1', href: '/login' },
		{ value: '2', href: '/1' },
		{ value: '3', href: '/2' },
		{ value: '4', href: '/3' },
		{ value: '5', href: '/4' }
	];

	return (
		<div>
			<MenuComponent items={items} pageWrapId="page-wrap" />
			<div id="page-wrap">
				<HeaderComponent />
				<RoutesComponent />
				<FooterComponent />
			</div>
		</div>
	);
}
