import React from 'react';
import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

import './my-input.component.scss';

type InputProps = {
	label: Path<any>;
	register: UseFormRegister<any>;
	required?: boolean;
	errors: FieldErrors<any>;
	placeholder?: string;
	type?: string;
	accept?: string;
};

function MyInputComponent({
	label,
	register,
	required = true,
	errors,
	placeholder,
	type = 'input',
	accept
}: InputProps) {
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
			{errors[`${label}`] && (
				<p className="my-input__error">{errors[`${label}`]?.message}</p>
			)}
		</div>
	);
}

export default MyInputComponent;
