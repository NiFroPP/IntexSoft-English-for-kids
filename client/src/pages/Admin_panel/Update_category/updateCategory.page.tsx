import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useNavigate } from 'react-router-dom';

import schema from './updateCategory.validation';
import allEndpoints from '../../../api';
import { getCompressedImageAsString } from '../../../utils/getImageAsString.utility';
import PATHS from '../../../models/enum/paths.enum';
import { UpdateCategoryRequestDto } from '../../../models/dto/request/updateCategory.request.dto';

import MyInputComponent from '../../../components/common/MyInput/MyInput.component';
import SubmitBtn from '../../../components/common/AdminPanel/SubminBtn/SubmitBtn.component';

import '../adminPanel.page.scss';

type Inputs = {
	'category for update': string;
	'new category name': string;
	'new category name in Russian': string;
	image: string;
};

function UpdateCategoryPage() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>({ resolver: yupResolver(schema) });

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const compressedImageFileAsString = await getCompressedImageAsString(data);

		const requestData: UpdateCategoryRequestDto = {
			name: data['category for update'],
			updName: data['new category name'],
			updNameRU: data['new category name in Russian'],
			updImage: compressedImageFileAsString
		};

		await allEndpoints.adminPanel.updateCategory(requestData);
		navigate(PATHS.ADMIN_PANEL);
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
				<SubmitBtn />
			</form>
		</div>
	);
}

export default UpdateCategoryPage;
