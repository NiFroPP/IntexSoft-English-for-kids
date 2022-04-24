import React from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import schema from './update-category.validation';
import allEndpoints from '../../../api';
import useRequestByFormData from '../hooks/useRequestByFormData';
import { getCompressedImageAsString } from '../../../utils/getImageAsString.utility';
import { UpdateCategoryRequestDto } from '../../../models/dto/request/update-category.request.dto';

import MyInputComponent from '../../../components/common/MyInput/my-input.component';
import SubmitBtn from '../../../components/common/AdminPanel/SubminBtn/submit-btn.component';

import '../admin-panel.page.scss';

type Inputs = {
	'category for update': string;
	'new category name': string;
	'new category name in Russian': string;
	image: Array<File>;
};

function UpdateCategoryPage() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>({ resolver: yupResolver(schema) });
	const [disabled, responseErr, onSubmit] = useRequestByFormData<Inputs>(
		async (data) => {
			const compressedImageFileAsString = await getCompressedImageAsString(
				data
			);
			const name = data['category for update'];

			const requestData: UpdateCategoryRequestDto = {
				updName: data['new category name'],
				updNameRU: data['new category name in Russian'],
				updImage: compressedImageFileAsString
			};

			return allEndpoints.adminPanel.updateCategory(name, requestData);
		}
	);

	return (
		<div className="admin-panel-page__field">
			<h2 className="admin-panel-page__title">Update category:</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MyInputComponent
					label="category for update"
					register={register}
					error={errors['category for update']}
					placeholder="name"
				/>
				<MyInputComponent
					label="new category name"
					register={register}
					error={errors['new category name']}
					placeholder="new name"
				/>
				<MyInputComponent
					label="new category name in Russian"
					register={register}
					error={errors['new category name in Russian']}
					placeholder="new rus name"
				/>
				<MyInputComponent
					label="image"
					register={register}
					error={errors.image as FieldError | undefined}
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
