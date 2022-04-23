import React, { useState } from 'react';
import {useForm, SubmitHandler, FieldError} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useNavigate } from 'react-router-dom';

import schema from './create-word.validation';
import allEndpoints from '../../../api';
import { getCompressedImageAsString } from '../../../utils/getImageAsString.utility';
import { getSoundAsString } from '../../../utils/getSoundAsString.utility';
import PATHS from '../../../models/enum/paths.enum';
import { CreateCardRequestDto } from '../../../models/dto/request/create-card.request.dto';

import MyInputComponent from '../../../components/common/MyInput/my-input.component';
import SubmitBtn from '../../../components/common/AdminPanel/SubminBtn/submit-btn.component';

import '../admin-panel.page.scss';

type Inputs = {
	'category for adding word': string;
	'word in English': string;
	'word in Russian': string;
	image: Array<File>;
	sound: Array<File>;
};

function CreateWordPage() {
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
		const compressedImageFileAsString = await getCompressedImageAsString(data);
		const soundFileAsString = await getSoundAsString(data);
		const name = data['category for adding word'];

		const requestData: CreateCardRequestDto = {
			cards: {
				name: data['word in English'],
				nameRU: data['word in Russian'],
				image: compressedImageFileAsString,
				sound: soundFileAsString
			}
		};

		const response = await allEndpoints.adminPanel.createCard(
			name,
			requestData
		);

		if (response.error) {
			setResponseErr(response.data.message);
			setDisabled(false);
		} else {
			navigate(PATHS.ADMIN_PANEL);
		}
	};

	return (
		<div className="admin-panel-page__field">
			<h2 className="admin-panel-page__title">Create word:</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MyInputComponent
					label="category for adding word"
					register={register}
					error={errors["category for adding word"]}
					placeholder="category name"
				/>
				<MyInputComponent
					label="word in English"
					register={register}
					error={errors["word in English"]}
					placeholder="add word in English"
				/>

				<MyInputComponent
					label="word in Russian"
					register={register}
					error={errors["word in Russian"]}
					placeholder="add word in Russian"
				/>
				<MyInputComponent
					label="image"
					register={register}
					error={errors.image as (FieldError | undefined)}
					type="file"
					accept="image/*"
				/>
				<MyInputComponent
					label="sound"
					register={register}
					error={errors.sound as (FieldError | undefined)}
					type="file"
					accept="audio/*"
				/>
				<SubmitBtn disabled={disabled} />
			</form>
			{responseErr ? (
				<h2 className="login-page__error">{responseErr}</h2>
			) : null}
		</div>
	);
}

export default CreateWordPage;
