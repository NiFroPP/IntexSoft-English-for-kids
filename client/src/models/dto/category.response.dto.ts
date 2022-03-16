import { CardDto } from './card.dto';

export interface CategoryResponseDto {
	_id: string;
	name: string;
	nameRU: string;
	image: string;
	cards: CardDto[];
}
