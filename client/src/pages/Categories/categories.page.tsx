import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Data from '../../assets/data.json';
import PATHS from '../../models/enum/paths.enum';
import TitleCardComponent from '../../components/common/Title-Card/titleCard.component';

import './categories.page.scss';

function CategoriesPage() {
	const navigate = useNavigate();

	const goToCategory = (name: string) => {
		navigate(`${PATHS.CATEGORY}/${name}`);
	};

	return (
		<div className="categories">
			<h3
				className="categories__title"
				title="Пожалуйста, выберите категорию для изучения.">
				Please, select category for study.
			</h3>
			<div className="categories__cards">
				{Data.map((section) => {
					// eslint-disable-next-line @typescript-eslint/no-var-requires,global-require,import/no-dynamic-require
					const path = require(`../../assets/images/${section.name}/${section.image}`);

					return (
						<div
							className="categories__card"
							key={section.name}
							onClick={() => goToCategory(section.name)}
							aria-hidden="true">
							<TitleCardComponent
								nameEN={section.name}
								nameRU={section.nameRU}
							/>
							<img
								className="categories__card-image"
								src={path}
								alt={section.name}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default CategoriesPage;
