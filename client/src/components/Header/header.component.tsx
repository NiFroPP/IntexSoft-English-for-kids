import React from 'react';
import { Link } from 'react-router-dom';

import PATHS from '../../models/enum/paths.enum';
import HeaderUserComponent from './header-user-component/header_user.component';

import './header.component.scss';

function HeaderComponent() {
	return (
		<header className="header">
			<div className="header__container">
				<Link className="header__title" to={PATHS.ABOUT}>
					English for Kids
				</Link>
				<HeaderUserComponent />
			</div>
		</header>
	);
}

export default HeaderComponent;
