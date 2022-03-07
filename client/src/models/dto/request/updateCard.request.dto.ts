export interface UpdateCardRequestDto {
	name: string;
	cardName: string;
	cards: {
		name: string;
		nameRU: string;
		image: string;
		sound: string;
	};
}
