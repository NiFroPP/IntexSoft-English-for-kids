import React from 'react';
import { Link } from 'react-router-dom';

import PATHS from '../../../../models/enum/paths.enum';

function SubmitBtn(props: any) {
	return (
		<div className="admin-panel-page__btn">
			<Link
				className="admin-panel-page__go-to-admin-panel"
				to={PATHS.ADMIN_PANEL}>
				Go to `Admin panel`
			</Link>
			<input type="submit" {...props} />
		</div>
	);
}

export default SubmitBtn;
