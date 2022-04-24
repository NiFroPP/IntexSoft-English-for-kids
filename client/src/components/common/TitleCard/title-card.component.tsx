import React, { useState } from 'react';

import './title-card.component.scss';

type TitleProps = {
	nameEN: string;
	nameRU: string;
};

function TitleCardComponent({ nameEN, nameRU }: TitleProps) {
	const [isHover, setIsHover] = useState(false);

	return (
		<div
			className="title-card"
			onPointerEnter={() => setIsHover(true)}
			onPointerLeave={() => setIsHover(false)}
			aria-hidden="true">
			{isHover ? (
				<>
					<h4>{nameRU}</h4>
					<div className="title-card__language">рус</div>
				</>
			) : (
				<>
					<h4>{nameEN}</h4>
					<div className="title-card__language">en</div>
				</>
			)}
		</div>
	);
}

export default TitleCardComponent;
