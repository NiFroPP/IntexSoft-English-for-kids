import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useTypeSelector';
import { getCategory } from '../../store/selectors/index.selector';

import CategoryCardComponent from './Card/category-card.component';
import LoadingComponent from '../../components/common/Loading/loading.component';

import './category.page.scss';

export interface Card {
	name: string;
	nameRU: string;
	image: string;
	sound: string;
}

function CategoryPage() {
	const params = useParams();
	const { fetchCategory } = useActions();
	const { cards, isLoading, errors } = useAppSelector(getCategory);

	useEffect(() => {
		fetchCategory({ name: params.id });
	}, [params.id]);

	if (isLoading) return <LoadingComponent />;
	if (errors) return <h2>{errors}</h2>;

	return (
		<div className="category">
			<h3
				className="category__title"
				title={`Вы находитесь в категрии ${params.id}.`}>
				{`You are in the category ${params.id}.`}
			</h3>
			<div className="category__cards">
				{cards.map((card) => (
					<CategoryCardComponent key={card.name} {...card} />
				))}
			</div>
		</div>
	);
}

export default CategoryPage;
