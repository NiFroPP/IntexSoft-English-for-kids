import React from 'react';
import {FieldError, Path, UseFormRegister} from 'react-hook-form';

import './my-input.component.scss';

type InputProps<T> = {
	label: Path<T>;
	register: UseFormRegister<T>;
	required?: boolean;
	error?: FieldError;
	placeholder?: string;
	type?: string;
	accept?: string;
};

function MyInputComponent<T>({
	label,
	register,
	required = true,
	error,
	placeholder,
	type = 'input',
	accept
}: InputProps<T>) {
	return (
		<div className="my-input__item">
			<div className="my-input__item-input">
				<label htmlFor={label}>Enter your {`"${label}"`}</label>
				<input
					id={label}
					placeholder={placeholder}
					type={type}
					accept={accept}
					{...register(label, { required })}
				/>
			</div>
			{error && (
				<p className="my-input__error">{error.message}</p>
			)}
		</div>
	);
}

export default MyInputComponent;
