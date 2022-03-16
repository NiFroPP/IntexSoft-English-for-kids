import React, { useState } from 'react';
import {
	FieldErrors,
	Path,
	SubmitHandler,
	useForm,
	UseFormRegister
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';

import schema from './validation';
import allEndpoints from '../../api';
import PATHS from '../../models/enum/paths.enum';

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
	const navigate = useNavigate();
	const [responseErr, setResponseErr] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IRegistration>({ resolver: yupResolver(schema) });

	const onSubmit: SubmitHandler<IRegistration> = async (data) => {
		const response = await allEndpoints.auth.registration(data);
		if (response.error) {
			setResponseErr(response.data.message);
		} else {
			navigate(PATHS.LOGIN);
		}
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
					<Link className="registration-page__go-to-login" to={PATHS.LOGIN}>
						Login
					</Link>
					<input type="submit" />
				</div>
			</form>
			{responseErr ? (
				<h2 className="registration-page__error">{responseErr}</h2>
			) : null}
		</div>
	);
}

export default RegistrationPage;
