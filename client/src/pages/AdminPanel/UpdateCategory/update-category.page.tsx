import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useNavigate } from 'react-router-dom';

import schema from './update-category.validation';
import allEndpoints from '../../../api';
import { getCompressedImageAsString } from '../../../utils/getImageAsString.utility';
import PATHS from '../../../models/enum/paths.enum';
import { UpdateCategoryRequestDto } from '../../../models/dto/request/update-category.request.dto';

import MyInputComponent from '../../../components/common/MyInput/my-input.component';
import SubmitBtn from '../../../components/common/AdminPanel/SubminBtn/submit-btn.component';

import '../admin-panel.page.scss';

type Inputs = {
	'category for update': string;
	'new category name': string;
	'new category name in Russian': string;
	image: string;
};

function UpdateCategoryPage() {
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
		const name = data['category for update'];

		const requestData: UpdateCategoryRequestDto = {
			updName: data['new category name'],
			updNameRU: data['new category name in Russian'],
			updImage: compressedImageFileAsString
		};

		const response = await allEndpoints.adminPanel.updateCategory(
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
			<h2 className="admin-panel-page__title">Update category:</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MyInputComponent
					label="category for update"
					register={register}
					errors={errors}
					placeholder="name"
				/>
				<MyInputComponent
					label="new category name"
					register={register}
					errors={errors}
					placeholder="new name"
				/>
				<MyInputComponent
					label="new category name in Russian"
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
				<SubmitBtn disabled={disabled} />
			</form>
			{responseErr ? (
				<h2 className="login-page__error">{responseErr}</h2>
			) : null}
		</div>
	);
}

export default UpdateCategoryPage;
