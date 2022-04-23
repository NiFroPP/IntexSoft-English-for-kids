import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useNavigate } from 'react-router-dom';

import schema from './delete-word.validation';

import MyInputComponent from '../../../components/common/MyInput/my-input.component';
import SubmitBtn from '../../../components/common/AdminPanel/SubminBtn/submit-btn.component';
import allEndpoints from '../../../api';
import PATHS from '../../../models/enum/paths.enum';
import { DeleteCardRequestDto } from '../../../models/dto/request/delete-card.request.dto';

import '../admin-panel.page.scss';

type Inputs = {
	'category to delete': string;
	'word to delete': string;
};

function DeleteWordPage() {
	const [responseErr, setResponseErr] = useState('');
	const [disabled, setDisabled] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>({ resolver: yupResolver(schema) });

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setDisabled(true);
		const requestData: DeleteCardRequestDto = {
			name: data['category to delete'],
			cards: {
				name: data['word to delete']
			}
		};

		const response = await allEndpoints.adminPanel.deleteCard(requestData);

		if (response.error) {
			setResponseErr(response.data.message);
			setDisabled(false);
		} else {
			navigate(PATHS.ADMIN_PANEL);
		}
	};

	return (
		<div className="admin-panel-page__field">
			<h2 className="admin-panel-page__title">Delete word:</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MyInputComponent
					label="category to delete"
					register={register}
					error={errors["category to delete"]}
					placeholder="category name"
				/>
				<MyInputComponent
					label="word to delete"
					register={register}
					error={errors["word to delete"]}
					placeholder="word"
				/>
				<SubmitBtn disabled={disabled} />
			</form>
			{responseErr ? (
				<h2 className="login-page__error">{responseErr}</h2>
			) : null}
		</div>
	);
}

export default DeleteWordPage;
