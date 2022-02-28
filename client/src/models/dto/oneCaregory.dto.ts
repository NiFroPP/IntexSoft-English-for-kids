export interface OneCardDto {
	_id: string;
	name: string;
	nameRU: string;
	image: string;
	sound: string;
}

export interface OneCategoryDto {
	_id: string;
	name: string;
	nameRU: string;
	image: string;
	cards: OneCardDto[];
}
