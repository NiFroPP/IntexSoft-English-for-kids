import React, { SyntheticEvent } from 'react';
import { ReactComponent as Star } from '../../../assets/images/star.svg';
import { useActions } from '../../../hooks/useActions';

type StarProps = {
	favorite: boolean;
	id: string;
};

function StarComponent({ favorite, id }: StarProps) {
	const { asyncSetToggleFollow } = useActions();

	const isToggleFollow = (e: SyntheticEvent) => {
		e.stopPropagation();
		asyncSetToggleFollow({ isFavorite: favorite, id });
	};

	return (
		<div className="categories__card-star">
			{favorite ? (
				<Star onClick={isToggleFollow} />
			) : (
				<Star fill="gray" onClick={isToggleFollow} />
			)}
		</div>
	);
}

export default StarComponent;
