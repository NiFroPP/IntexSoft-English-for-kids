import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/useTypeSelector';
import { setUserDataActionCreation } from '../../../store/reducers/user.reducer';
import PATHS from '../../../models/enum/paths.enum';

import './header_user.component.scss';

function HeaderUserComponent() {
	const { username, isLogin } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const loading = () => {
		const user = localStorage.getItem('auth-token');
		if (user) {
			dispatch(
				setUserDataActionCreation({
					isLogin: true,
					username: JSON.parse(user).username
				})
			);
			navigate(PATHS.CATEGORY);
		}
	};

	useEffect(() => loading(), [username]);

	const logout = () => {
		localStorage.removeItem('auth-token');
		dispatch(setUserDataActionCreation({ username: '', isLogin: false }));
	};

	const goToSettingPage = () => {
		navigate(PATHS.ADMIN_PANEL);
	};

	return (
		<div className="header__user">
			{isLogin ? (
				<>
					<div
						className="header__user-name"
						onClick={goToSettingPage}
						aria-hidden="true">
						{username}
					</div>
					<button type="button" className="header__user-btn" onClick={logout}>
						Logout
					</button>
				</>
			) : null}
		</div>
	);
}

export default HeaderUserComponent;
