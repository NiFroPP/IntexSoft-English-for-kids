import React from 'react';
import { Link } from 'react-router-dom';

import PATHS from '../../models/enum/paths.enum';

import './adminPanel.page.scss';

function AdminPanelPage() {
	return (
		<div className="admin-panel-page__field">
			<h2 className="admin-panel-page__title">Admin Panel:</h2>
			<div className="admin-panel-page__section">
				<h3>Category:</h3>
				<Link
					className="admin-panel-page__go-to-change"
					to={PATHS.ADMIN_PANEL__CREATE_CATEGORY}>
					Create category
				</Link>
				<Link
					className="admin-panel-page__go-to-change"
					to={PATHS.ADMIN_PANEL__UPDATE_CATEGORY}>
					Update category
				</Link>
				<Link
					className="admin-panel-page__go-to-change"
					to={PATHS.ADMIN_PANEL__DELETE_CATEGORY}>
					Delete category
				</Link>
			</div>
			<div className="admin-panel-page__section">
				<h3>Card:</h3>
				<Link
					className="admin-panel-page__go-to-change"
					to={PATHS.ADMIN_PANEL__CREATE_WORD}>
					Create word
				</Link>
				<Link
					className="admin-panel-page__go-to-change"
					to={PATHS.ADMIN_PANEL__UPDATE_WORD}>
					Update word
				</Link>
				<Link
					className="admin-panel-page__go-to-change"
					to={PATHS.ADMIN_PANEL__DELETE_WORD}>
					Delete word
				</Link>
			</div>
		</div>
	);
}

export default AdminPanelPage;
