import React from 'react';
import {
	FieldErrors,
	Path,
	SubmitHandler,
	useForm,
	UseFormRegister
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

import schema from './validation';
import allEndpoints from '../../api';

import './registration.page.scss';

export interface IRegistration {
	username: string;
	email: string;
	password: string;
}

type InputProps = {
	label: Path<IRegistration>;
	register: UseFormRegister<IRegistration>;
	required: boolean;
	errors: FieldErrors<IRegistration>;
};

function Input({ label, register, required, errors }: InputProps) {
	return (
		<div className="registration-page__item">
			<div className="registration-page__item-input">
				<label htmlFor={label}>Enter your {label}</label>
				<input id={label} {...register(label, { required })} />
			</div>
			{errors[`${label}`] && (
				<p className="registration-page__error">
					{errors[`${label}`]?.message}
				</p>
			)}
		</div>
	);
}

function RegistrationPage() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IRegistration>({ resolver: yupResolver(schema) });

	const onSubmit: SubmitHandler<IRegistration> = async (data) => {
		console.log(data);
		const response = await allEndpoints.auth.registration(data);
		// const response = await allEndpoints.auth.getAllUsers();
		console.log(response);
	};

	return (
		<div className="registration-page__field">
			<form
				className="registration-page__form"
				onSubmit={handleSubmit(onSubmit)}>
				<Input label="username" register={register} required errors={errors} />
				<Input label="email" register={register} required errors={errors} />
				<Input label="password" register={register} required errors={errors} />
				<div className="registration-page__btn">
					<Link className="registration-page__go-to-login" to="/login">
						Login
					</Link>
					<input type="submit" />
				</div>
			</form>
		</div>
	);
}

export default RegistrationPage;
