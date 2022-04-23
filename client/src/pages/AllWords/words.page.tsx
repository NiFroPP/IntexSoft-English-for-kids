import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { useActions } from '../../hooks/useActions';
import { useAppSelector } from '../../hooks/useTypeSelector';
import { getCategory } from '../../store/selectors/index.selector';
import MySelectComponent, {
	SelectOptions
} from '../../components/common/MySelect/my-select.component';

import './words.page.scss';
import {WordDto} from "../../models/dto/word.dto";

function WordsPage() {
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

	const defaultSortType = 'name';
	const [sortType, setSortType] = useState<keyof WordDto>(defaultSortType);
	const [searchQuery, setSearchQuery] = useState('');
	const { fetchAllWords } = useActions();
	const { words } = useAppSelector(getCategory);

	useEffect(() => {
		fetchAllWords();
	}, []);

	const sortedWords = useMemo(
		() =>
			[...words].sort((a: WordDto, b: WordDto) =>
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
				defaultValue={defaultSortType}
				options={options}
			/>

			<input
				value={searchQuery}
				onChange={onSearch}
				placeholder="Search word/ Поиск слова..."
			/>

			<div className="words-page__card">
				<div
					className="words-page__card-title"
					onClick={() => setSortType('name')}
					aria-hidden="true">
					English / Английский
				</div>
				<div
					className="words-page__card-title"
					onClick={() => setSortType('nameRU')}
					aria-hidden="true">
					Russian / Русский
				</div>
				<div
					className="words-page__card-title"
					onClick={() => setSortType('category')}
					aria-hidden="true">
					Category / Категория
				</div>
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
