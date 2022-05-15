import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { WordDto } from '../../../models/dto/word.dto';

import MySelectComponent, {
	SelectOptions
} from '../../../components/common/MySelect/my-select.component';

import './words-search-bar.component.scss';

type WorldsSearchBar = {
	sortType: keyof WordDto;
	setSortType: Dispatch<SetStateAction<keyof WordDto>>;
	defaultSortType: keyof WordDto;
	searchQuery: string;
	onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

function WordsSearchBarComponent({
	sortType,
	setSortType,
	defaultSortType,
	searchQuery,
	onSearch
}: WorldsSearchBar) {
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

	return (
		<div>
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
		</div>
	);
}

export default WordsSearchBarComponent;
