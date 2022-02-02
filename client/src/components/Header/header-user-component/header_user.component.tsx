import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/useTypeSelector';

import './header_user.component.scss';
import { setUserDataActionCreation } from '../../../store/reducers/user.reducer';

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
		}
	};

	useEffect(() => loading(), [username]);

	const logout = () => {
		navigate('/');
		localStorage.removeItem('auth-token');
		dispatch(setUserDataActionCreation({ username: '', isLogin: false }));
	};

	const goToRegister = () => {
		navigate('/login');
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
