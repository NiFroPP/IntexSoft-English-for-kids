import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import './auth.page.sass';

interface IFormValues {
	email: string;
	password: string;
}

export default function AuthPage() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IFormValues>();
	const onSubmit: SubmitHandler<IFormValues> = (data) => console.log(data);

	return (
		<form className="auth-page__form" onSubmit={handleSubmit(onSubmit)}>
			<input {...register('email', { required: true })} />
			{errors.email && <p>Email is required</p>}
			<input {...register('password', { required: true })} />
			{errors.password && <p>Password is required</p>}
			<p>{errors.password?.message}</p>
			<input type="submit" />
		</form>
	);
}
