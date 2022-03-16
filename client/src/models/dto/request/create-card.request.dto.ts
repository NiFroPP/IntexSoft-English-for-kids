export interface CreateCardRequestDto {
	cards: {
		name: string;
		nameRU: string;
		image: string;
		sound: string;
	};
}
