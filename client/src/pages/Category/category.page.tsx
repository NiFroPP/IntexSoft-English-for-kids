import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import './category.page.scss';
import TitleCardComponent from '../../components/common/Title-Card/titleCard.component';
import CategoryCardComponent from './Card/categoryCard.component';

function CategoryPage() {
	const params = useParams();

	// eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
	const imgPath1 = require(`../../assets/images/animals/01.png`);
	// eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
	const soundPath1 = require(`../../assets/audio/animals/01.mp3`);

	// eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
	const imgPath2 = require(`../../assets/images/animals/02.png`);
	// eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
	const soundPath2 = require(`../../assets/audio/animals/02.mp3`);

	return (
		<div className="category">
			<h3
				className="category__title"
				title={`Вы находитесь в категрии ${params.id}.`}>
				{`You are in the category ${params.id}.`}
			</h3>
			<div className="category__cards">
				<CategoryCardComponent imgPath={imgPath1} soundPath={soundPath1} />
				<CategoryCardComponent imgPath={imgPath2} soundPath={soundPath2} />
			</div>
		</div>
	);
}

export default CategoryPage;
