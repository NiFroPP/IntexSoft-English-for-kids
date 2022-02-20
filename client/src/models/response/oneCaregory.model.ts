export interface OneCard {
	_id: string;
	name: string;
	nameRU: string;
	image: string;
	sound: string;
}

export interface OneCategory {
	_id: string;
	name: string;
	nameRU: string;
	image: string;
	cards: OneCard[];
}
