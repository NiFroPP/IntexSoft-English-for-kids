import React, { useState } from 'react';
import {
	useForm,
	SubmitHandler,
	Path,
	UseFormRegister,
	FieldErrors
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

import schema from './validation';
import allEndpoints from '../../api';
import { useAppDispatch } from '../../hooks/useTypeSelector';
import { setUserData } from '../../store/reducers/user.reducer';
import { getUserFromToken } from '../../utils/getUserFromToken';
import PATHS from '../../models/enum/paths.enum';
import { LoginRequestDto } from '../../models/dto/login.request.dto';

import './login.page.scss';

type InputProps = {
	label: Path<LoginRequestDto>;
	register: UseFormRegister<LoginRequestDto>;
	required: boolean;
	errors: FieldErrors<LoginRequestDto>;
};

function Input({ label, register, required, errors }: InputProps) {
	return (
		<div className="login-page__item">
			<div className="login-page__item-input">
				<label htmlFor={label}>Enter your {label}</label>
				<input id={label} {...register(label, { required })} />
			</div>
			{errors[`${label}`] && (
				<p className="login-page__error">{errors[`${label}`]?.message}</p>
			)}
		</div>
	);
}

function LoginPage() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [responseErr, setResponseErr] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginRequestDto>({ resolver: yupResolver(schema) });

	const onSubmit: SubmitHandler<LoginRequestDto> = async (data) => {
		const response = await allEndpoints.auth.login(data);

		if (response.error) {
			setResponseErr(response.data.message);
		} else {
			localStorage.setItem('auth-token', JSON.stringify(response.data));
			const user = getUserFromToken(response.data);
			dispatch(
				setUserData({ username: user.username, isAdmin: user.role === 'ADMIN' })
			);
			navigate(PATHS.ABOUT);
		}
	};

	return (
		<div className="login-page__field">
			<form className="login-page__form" onSubmit={handleSubmit(onSubmit)}>
				<Input label="email" register={register} required errors={errors} />
				<Input label="password" register={register} required errors={errors} />
				<div className="login-page__btn">
					<Link className="login-page__go-to-register" to={PATHS.REGISTRATION}>
						Create account
					</Link>
					<input type="submit" />
				</div>
			</form>
			{responseErr ? (
				<h2 className="login-page__error">{responseErr}</h2>
			) : null}
		</div>
	);
}

export default LoginPage;
