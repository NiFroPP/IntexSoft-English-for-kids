import React from 'react';

import { WordDto } from '../../../models/dto/word.dto';

import './words-list.component.scss';

function WordsListComponent({ words }: { words: WordDto[] }) {
	return (
		<div className="words-page__cards">
			<div className="words-page__card">
				<div className="words-page__card-title" aria-hidden="true">
					English / Английский
				</div>
				<div className="words-page__card-title" aria-hidden="true">
					Russian / Русский
				</div>
				<div className="words-page__card-title" aria-hidden="true">
					Category / Категория
				</div>
			</div>
			{words.map((word, index) => (
				<div className="words-page__card" key={word.id}>
					<div className="words-page__card-en">
						{index + 1}. {word.name}
					</div>
					<div className="words-page__card-ru">{word.nameRU}</div>
					<div className="words-page__card-category">{word.category}</div>
				</div>
			))}
			{!words.length && (
				<h2 className="words-page__no_words">Word not found!</h2>
			)}
		</div>
	);
}

export default WordsListComponent;
