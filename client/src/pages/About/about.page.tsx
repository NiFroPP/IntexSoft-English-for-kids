import React from 'react';
import { Link } from 'react-router-dom';

import PATHS from '../../models/enum/paths.enum';
import TreeComponent from './Tree/tree.component';

import './about.page.scss';

function AboutPage() {
	return (
		<div className="home-page">
			<p title="На этом сайте вы можете изучать слова на английском">
				On this site you can learn words in English
			</p>
			<p title="Выберите категорию для изучения">Choose a category to study.</p>
			<Link
				className="home-page__to-go-select"
				to={PATHS.CATEGORY}
				title="Перейти к выбору категорий">
				Go to select categories
			</Link>
			<TreeComponent />
		</div>
	);
}

export default AboutPage;
