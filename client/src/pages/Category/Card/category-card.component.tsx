import React, { useState } from 'react';

import TitleCardComponent from '../../../components/common/TitleCard/title-card.component';
import { Card } from '../category.page';

function CategoryCardComponent({ name, nameRU, sound, image }: Card) {
	const [audio] = useState(new Audio(sound));

	const playSound = () => {
		audio.play();
	};

	return (
		<div className="category__card" onClick={playSound} aria-hidden="true">
			<img className="category__card-image" src={image} alt={name} />
			<TitleCardComponent nameEN={name} nameRU={nameRU} />
		</div>
	);
}

export default CategoryCardComponent;
