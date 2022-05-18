import { Category } from 'store/reducers/types/category.reducer';
import { RootState } from '../store';
import { User } from '../reducers/types/user.reducer';

export const getUser = (state: RootState): User => state.user;
export const getCategory = (state: RootState): Category => state.category;
