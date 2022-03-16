import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../hooks/useTypeSelector';
import { getUser } from '../../../store/selectors/index.selector';
import PATHS from '../../../models/enum/paths.enum';

import MyButton from '../../common/MyButton/my-button.component';

import './header-admin-panel.component.scss';

function HeaderAdminPanel() {
	const { isAdmin } = useAppSelector(getUser);

	const navigate = useNavigate();

	const goToSettingPage = () => {
		navigate(PATHS.ADMIN_PANEL);
	};

	return (
		<div className="header__user-admin">
			{isAdmin ? (
				<MyButton onClick={goToSettingPage}>Admin panel</MyButton>
			) : null}
		</div>
	);
}

export default HeaderAdminPanel;
