import React, { ChangeEvent, useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';
import { useSortedAndSearchedWords } from '../../hooks/useSortedAndSearchedWords';
import { getCategory } from '../../store/selectors/index.selector';
import { WordDto } from '../../models/dto/word.dto';

import WordsListComponent from './WordsList/words-list.component';
import WordsSearchBarComponent from './WordsSearchBar/words-search-bar.component';
import LoadingComponent from '../../components/common/Loading/loading.component';

import './words.page.scss';

function WordsPage() {
	const defaultSortType = 'name';
	const [sortType, setSortType] = useState<keyof WordDto>(defaultSortType);
	const [searchQuery, setSearchQuery] = useState('');
	const { fetchAllWordsAC } = useActions();
	const { words, isLoading } = useAppSelector(getCategory);
	const sortedAndSearchedWords = useSortedAndSearchedWords(
		words,
		sortType,
		searchQuery
	);

	useEffect(() => {
		fetchAllWordsAC();
	}, []);

	const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	if (isLoading) return <LoadingComponent />;

	return (
		<div className="words-page a">
			<WordsSearchBarComponent
				sortType={sortType}
				setSortType={setSortType}
				defaultSortType={defaultSortType}
				searchQuery={searchQuery}
				onSearch={onSearch}
			/>
			<WordsListComponent words={sortedAndSearchedWords} />
		</div>
	);
}

export default WordsPage;
