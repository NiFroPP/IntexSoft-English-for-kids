export interface CreateWordRequestDto {
	cards: {
		name: string;
		nameRU: string;
		image: string;
		sound: string;
	};
}
