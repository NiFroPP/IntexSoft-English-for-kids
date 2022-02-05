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
			navigate(PATHS.ABOUT);
		}
	};

	useEffect(() => loading(), [username]);

	const logout = () => {
		navigate(PATHS.ABOUT);
		localStorage.removeItem('auth-token');
		dispatch(setUserDataActionCreation({ username: '', isLogin: false }));
	};

	return (
		<div className="header__user">
			{isLogin ? (
				<>
					<div className="header__user-name">{username}</div>
					<button type="button" className="header__user-btn" onClick={logout}>
						Logout
					</button>
				</>
			) : null}
		</div>
	);
}

export default HeaderUserComponent;
