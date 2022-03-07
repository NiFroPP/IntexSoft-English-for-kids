export interface CreateWordRequestDto {
	name: string;
	cards: {
		name: string;
		nameRU: string;
		image: string;
		sound: string;
	};
}
