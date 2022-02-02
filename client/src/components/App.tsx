import React from 'react';

import HeaderComponent from './Header/header.component';
import FooterComponent from './Footer/footer.component';
import MenuComponent from './Menu/menu.component';
import MainComponent from './Main/main.component';

export interface Item {
	value: string;
	href: string;
}

export default function App() {
	const isLoading = false;

	const items: Item[] = [
		{ value: 'login', href: '/login' },
		{ value: 'registration', href: '/registration' },
		{ value: '3', href: '/2' },
		{ value: '4', href: '/3' },
		{ value: '5', href: '/4' }
	];

	return (
		<div>
			<MenuComponent items={items} pageWrapId="page-wrap" />
			<div id="page-wrap">
				<HeaderComponent />
				<MainComponent />
				<FooterComponent />
			</div>
		</div>
	);
}
