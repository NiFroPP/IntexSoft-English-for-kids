import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUser } from '../../../store/selectors/index.selector';
import { useAppSelector } from '../../../hooks/useTypeSelector';
import { getUserFromToken } from '../../../utils/getUserFromToken';
import PATHS from '../../../models/enum/paths.enum';
import HeaderAdminPanel from '../header-admin-panel-component/header-admin-panel.component';
import MyButton from '../../common/MyButton/my-button.component';

import './header-user.component.scss';
import { useActions } from '../../../hooks/useActions';

function HeaderUserComponent() {
	const { username, isLogin } = useAppSelector(getUser);
	const navigate = useNavigate();
	const { setUserData, fetchCategoriesAC, fetchFavoriteCategoriesAC } =
		useActions();

	const loading = () => {
		const token = localStorage.getItem('auth-token');
		if (token) {
			const user = getUserFromToken(JSON.parse(token));

			setUserData({
				isLogin: true,
				username: user.username,
				isAdmin: user.role === 'ADMIN'
			});

			if (username) {
				fetchCategoriesAC();
				fetchFavoriteCategoriesAC();
			}
			navigate(PATHS.CATEGORY);
		}
	};

	useEffect(() => loading(), [username]);

	const logout = () => {
		localStorage.removeItem('auth-token');
		setUserData({ username: '', isLogin: false, isAdmin: false });
	};

	return (
		<div className="header__user">
			{isLogin ? (
				<>
					<HeaderAdminPanel />
					<div className="header__user-info">
						<div className="header__user-name">{username}</div>
						<MyButton onClick={logout}>Logout</MyButton>
					</div>
				</>
			) : null}
		</div>
	);
}

export default HeaderUserComponent;
