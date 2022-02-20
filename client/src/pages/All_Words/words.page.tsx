import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import MySelectComponent, {
	SelectOptions
} from '../../components/common/MySelect/MySelect.component';

import './words.page.scss';

interface Data {
	id: number;
	name: string;
	nameRU: string;
	category: string;
}

function WordsPage() {
	const data: Data[] = [
		{ id: 1, name: 'b', nameRU: 'а', category: '2' },
		{ id: 2, name: 'a', nameRU: 'ы', category: '3' },
		{ id: 3, name: 'c', nameRU: 'я', category: '1' },
		{ id: 4, name: 'd', nameRU: 'пц', category: '1' }
	];

	const options: SelectOptions[] = [
		{
			value: 'name',
			name: 'English alphabet'
		},
		{
			value: 'nameRU',
			name: 'Russian alphabet'
		},
		{
			value: 'category',
			name: 'Category'
		}
	];

	const [sortType, setSortType] = useState('name');
	const [words, setWords] = useState(data);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		setWords(words);
	}, []);

	const sortedWords = useMemo(
		() =>
			[...data].sort((a: any, b: any) =>
				a[sortType].localeCompare(b[sortType])
			),
		[sortType, words]
	);

	const sortedAndSearchedWords = useMemo(
		() =>
			sortedWords.filter(
				(word) =>
					word.name.toLowerCase().includes(searchQuery) ||
					word.nameRU.toLowerCase().includes(searchQuery) ||
					word.category.toLowerCase().includes(searchQuery)
			),
		[searchQuery, sortedWords]
	);

	const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<div className="words-page">
			<MySelectComponent
				value={sortType}
				onChange={setSortType}
				defaultValue="--Please choose an option by sort--"
				options={options}
			/>

			<input
				value={searchQuery}
				onChange={onSearch}
				placeholder="Search word/ Поиск слова..."
			/>

			<div className="words-page__card">
				<div className="words-page__card-title">English / Английский</div>
				<div className="words-page__card-title">Russian/ Русский</div>
				<div className="words-page__card-title">Category/ Категория</div>
			</div>

			{sortedAndSearchedWords.map((word, index) => (
				<div className="words-page__card" key={word.id}>
					<div className="words-page__card-en">
						{index + 1}. {word.name}
					</div>
					<div className="words-page__card-ru">{word.nameRU}</div>
					<div className="words-page__card-category">{word.category}</div>
				</div>
			))}
		</div>
	);
}

export default WordsPage;
