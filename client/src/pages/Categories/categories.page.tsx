import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useTypeSelector';
import { getCategory, getUser } from '../../store/selectors/index.selector';
import PATHS from '../../models/enum/paths.enum';

import TitleCardComponent from '../../components/common/TitleCard/title-card.component';
import StarComponent from '../../components/common/StarSVG/star.component';
import LoadingComponent from '../../components/common/Loading/loading.component';
import LoadingLittle from '../../components/common/Loading-little/loading-little.component';

import './categories.page.scss';

function CategoriesPage() {
	const navigate = useNavigate();
	const { categories, isLoading, errors } = useAppSelector(getCategory);
	const { favoriteCategories, isFetching } = useAppSelector(getUser);

	const categoriesWithFavorite = categories.map((category) =>
		favoriteCategories.includes(category._id)
			? { ...category, favorite: true }
			: { ...category, favorite: false }
	);

	const goToCategory = (name: string) => {
		navigate(`${PATHS.CATEGORY}/${name}`);
	};

	if (isLoading) return <LoadingComponent />;
	if (errors) return <h2>{errors}</h2>;

	return (
		<div className="categories">
			<h3
				className="categories__title"
				title="Пожалуйста, выберите категорию для изучения.">
				Please, select category for study.
			</h3>
			<div className="categories__cards">
				{categoriesWithFavorite.map((card) => {
					return (
						<div
							className="categories__card"
							key={card.name}
							onClick={() => goToCategory(card.name)}
							aria-hidden="true">
							<TitleCardComponent nameEN={card.name} nameRU={card.nameRU} />
							<img
								className="categories__card-image"
								src={card.image}
								alt={card.name}
							/>
							{isFetching ? (
								<LoadingLittle />
							) : (
								<StarComponent favorite={card.favorite} id={card._id} />
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default CategoriesPage;
