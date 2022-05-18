import { User } from '../reducers/types/user.reducer';
import { FollowRequestDto } from '../../models/dto/follow.request.dto';

export const getFavoriteCategories = (state: User, payload: FollowRequestDto) =>
	payload.isFavorite
		? state.favoriteCategories.filter((id) => id !== payload.id)
		: [...state.favoriteCategories, payload.id];
