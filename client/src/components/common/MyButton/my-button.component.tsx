import React from 'react';

import './my-button.component.scss';

function MyButton({
	children,
	onClick
}: {
	children?: string;
	onClick?: () => void;
}) {
	return (
		<button type="button" className="my-button" onClick={onClick}>
			{children}
		</button>
	);
}

export default MyButton;
