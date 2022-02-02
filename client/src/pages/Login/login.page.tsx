import React from 'react';
import {
	useForm,
	SubmitHandler,
	Path,
	UseFormRegister,
	FieldErrors
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

import schema from '../Registration/validation';

import './login.page.scss';
import allEndpoints from '../../api';
import { useAppDispatch } from '../../hooks/useTypeSelector';
import { setUserDataActionCreation } from '../../store/reducers/user.reducer';

export interface ILogin {
	email: string;
	password: string;
}

type InputProps = {
	label: Path<ILogin>;
	register: UseFormRegister<ILogin>;
	required: boolean;
	errors: FieldErrors<ILogin>;
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

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ILogin>({ resolver: yupResolver(schema) });

	const onSubmit: SubmitHandler<ILogin> = async (data) => {
		const response = await allEndpoints.auth.login(data);
		localStorage.setItem('auth-token', JSON.stringify(response.data));
		dispatch(setUserDataActionCreation({ username: response.data.username }));
		navigate('/');
	};

	return (
		<div className="login-page__field">
			<form className="login-page__form" onSubmit={handleSubmit(onSubmit)}>
				<Input label="email" register={register} required errors={errors} />
				<Input label="password" register={register} required errors={errors} />
				<div className="login-page__btn">
					<Link className="login-page__go-to-register" to="/registration">
						Create account
					</Link>
					<input type="submit" />
				</div>
			</form>
		</div>
	);
}

export default LoginPage;
