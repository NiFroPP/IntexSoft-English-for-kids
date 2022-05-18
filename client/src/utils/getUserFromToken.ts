import jwtDecode from 'jwt-decode';
import { LoginResponseDto } from '../models/dto/login.response.dto';

interface User {
	_id: string;
	email: string;
	password: string;
	username: string;
	role: string;
	favoriteCategory: string[];
}

interface DecodeToken {
	user: User;
	exp: number;
	iat: number;
}

export const getUserFromToken = (data: LoginResponseDto): User => {
	const tokenDecode: DecodeToken = jwtDecode(data.token);

	return tokenDecode.user;
};
