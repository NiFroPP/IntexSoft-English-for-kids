import { useMemo } from 'react';

import { WordDto } from '../models/dto/word.dto';

export const useSortedWords = (words: WordDto[], sortType: keyof WordDto) => {
	return useMemo(
		() =>
			[...words].sort((a: WordDto, b: WordDto) =>
				a[sortType].localeCompare(b[sortType])
			),
		[sortType, words]
	);
};

export const useSortedAndSearchedWords = (
	words: WordDto[],
	sortType: keyof WordDto,
	searchQuery: string
) => {
	const sortedWords = useSortedWords(words, sortType);
	return useMemo(
		() =>
			sortedWords.filter(
				(word) =>
					word.name.toLowerCase().includes(searchQuery) ||
					word.nameRU.toLowerCase().includes(searchQuery) ||
					word.category.toLowerCase().includes(searchQuery)
			),
		[searchQuery, sortedWords]
	);
};
