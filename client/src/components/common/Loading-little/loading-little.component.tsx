import React from 'react';

import './loading-little.component.scss';

export default function LoadingLittle() {
	return (
		<div className="loading-little__container">
			<div
				className="loading-little"
				onClick={(e) => e.stopPropagation()}
				aria-hidden="true"
			/>
		</div>
	);
}
