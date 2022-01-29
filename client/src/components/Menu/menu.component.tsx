import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import './menu.component.scss';

function MenuComponent({ items }: any) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Menu
			isOpen={isOpen}
			onStateChange={(state: any) => setIsOpen(state.isOpen)}>
			{items.map((item: any) => (
				<Link to={item.href} onClick={() => setIsOpen(false)} key={item.value}>
					{item.value}
				</Link>
			))}
		</Menu>
	);
}

export default MenuComponent;
