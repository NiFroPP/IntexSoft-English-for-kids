import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useNavigate } from 'react-router-dom';

import schema from './updateWord.validarion';
import allEndpoints from '../../../api';
import { getCompressedImageAsString } from '../../../utils/getImageAsString.utility';
import { getSoundAsString } from '../../../utils/getSoundAsString.utility';
import PATHS from '../../../models/enum/paths.enum';
import { UpdateCardRequestDto } from '../../../models/dto/request/updateCard.request.dto';

import MyInputComponent from '../../../components/common/MyInput/MyInput.component';
import SubmitBtn from '../../../components/common/AdminPanel/SubminBtn/SubmitBtn.component';

import '../adminPanel.page.scss';

type Inputs = {
	'category for updating': string;
	'word for updating': string;
	'new word in English': string;
	'new word in Russian': string;
	image: string;
	sound: string;
};

function UpdateWordPage() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>({ resolver: yupResolver(schema) });

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const compressedImageFileAsString = await getCompressedImageAsString(data);
		const soundFileAsString = await getSoundAsString(data);

		const requestData: UpdateCardRequestDto = {
			name: data['category for updating'],
			cardName: data['word for updating'],
			cards: {
				name: data['new word in English'],
				nameRU: data['new word in Russian'],
				image: compressedImageFileAsString,
				sound: soundFileAsString
			}
		};

		await allEndpoints.adminPanel.updateCard(requestData);
		navigate(PATHS.ADMIN_PANEL);
	};

	return (
		<div className="admin-panel-page__field">
			<h2 className="admin-panel-page__title">Update word:</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MyInputComponent
					label="category for updating"
					register={register}
					errors={errors}
					placeholder="category name"
				/>
				<MyInputComponent
					label="word for updating"
					register={register}
					errors={errors}
					placeholder="word name"
				/>
				<MyInputComponent
					label="new word in English"
					register={register}
					errors={errors}
					placeholder="new eng name"
				/>
				<MyInputComponent
					label="new word in Russian"
					register={register}
					errors={errors}
					placeholder="new rus name"
				/>
				<MyInputComponent
					label="image"
					register={register}
					errors={errors}
					type="file"
					accept="image/*"
				/>
				<MyInputComponent
					label="sound"
					register={register}
					errors={errors}
					type="file"
					accept="audio/*"
				/>
				<SubmitBtn />
			</form>
		</div>
	);
}

export default UpdateWordPage;
