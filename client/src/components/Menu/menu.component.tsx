import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import PATHS from '../../models/enum/paths.enum';

import './menu.component.scss';

interface MenuItem {
	category: string;
	href: string;
}

function MenuComponent() {
	const [isOpen, setIsOpen] = useState(false);

	const menuItems: MenuItem[] = [
		{ category: 'home', href: PATHS.ABOUT },
		{ category: 'categories', href: PATHS.CATEGORY },
		{ category: 'login', href: PATHS.LOGIN },
		{ category: 'registration', href: PATHS.REGISTRATION },
		{ category: '5', href: '/4' }
	];

	return (
		<Menu
			pageWrapId="page-wrap"
			isOpen={isOpen}
			onStateChange={(state: {
				isOpen: boolean | ((prevState: boolean) => boolean);
			}) => setIsOpen(state.isOpen)}>
			{menuItems.map((item: MenuItem) => (
				<Link
					to={item.href}
					onClick={() => setIsOpen(false)}
					key={item.category}>
					{item.category}
				</Link>
			))}
		</Menu>
	);
}

export default MenuComponent;
