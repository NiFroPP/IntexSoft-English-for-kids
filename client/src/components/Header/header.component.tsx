import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import HeaderUserComponent from './header-user-component/header_user.component';

import './header.component.scss';

function HeaderComponent() {
	const navigate = useNavigate();

	return (
		<header className="header">
			<div className="header__container">
				<Link className="header__title" to="/">
					English for Kids
				</Link>
				<HeaderUserComponent />
			</div>
		</header>
	);
}

export default HeaderComponent;
