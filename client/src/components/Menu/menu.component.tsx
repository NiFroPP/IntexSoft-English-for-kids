import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useTypeSelector';
import { getCategory } from '../../store/selectors/index.selector';
import PATHS from '../../models/enum/paths.enum';

import './menu.component.scss';

function MenuComponent() {
	const [isOpen, setIsOpen] = useState(false);
	const { categories } = useAppSelector(getCategory);

	const openHandler = () => {
		setIsOpen(false);
	};

	return (
		<Menu
			pageWrapId="page-wrap"
			isOpen={isOpen}
			onStateChange={(state: {
				isOpen: boolean | ((prevState: boolean) => boolean);
			}) => setIsOpen(state.isOpen)}>
			<Link to={PATHS.CATEGORY} onClick={openHandler}>
				CATEGORIES
			</Link>
			{categories.map((card) => (
				<Link
					className="menu-category"
					to={`${PATHS.CATEGORY}/${card.name}`}
					onClick={openHandler}
					key={card.name}>
					{card.name}
				</Link>
			))}
			<hr />
			<Link to={PATHS.WORDS} onClick={openHandler}>
				ALL WORDS
			</Link>
		</Menu>
	);
}

export default MenuComponent;
