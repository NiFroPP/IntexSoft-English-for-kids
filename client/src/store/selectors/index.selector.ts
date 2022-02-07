import { RootState } from '../store';
import { User } from '../reducers/user.reducer';
import { Category } from '../reducers/caregory.reducer';

export const getUser = (state: RootState): User => state.user;
export const getCategory = (state: RootState): Category => state.category;
