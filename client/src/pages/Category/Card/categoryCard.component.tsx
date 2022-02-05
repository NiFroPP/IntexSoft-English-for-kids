import React, { useState } from 'react';

import TitleCardComponent from '../../../components/common/Title-Card/titleCard.component';

function CategoryCardComponent({ imgPath, soundPath }: any) {
	const [audio] = useState(new Audio(soundPath));

	const playSound = () => {
		audio.play();
	};

	return (
		<div className="category__card" onClick={playSound} aria-hidden="true">
			<img className="category__card-image" src={imgPath} alt="" />
			<TitleCardComponent nameEN="fox" nameRU="лиса" />
		</div>
	);
}

export default CategoryCardComponent;
