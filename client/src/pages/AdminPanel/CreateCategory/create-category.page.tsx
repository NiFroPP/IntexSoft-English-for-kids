import React from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import schema from './create-category.validation';
import allEndpoints from '../../../api';
import useRequestByFormData from '../hooks/useRequestByFormData';
import { getCompressedImageAsString } from '../../../utils/getImageAsString.utility';
import { CreateCategoryRequestDto } from '../../../models/dto/request/create-category.request.dto';

import MyInputComponent from '../../../components/common/MyInput/my-input.component';
import SubmitBtn from '../../../components/common/AdminPanel/SubminBtn/submit-btn.component';

import '../admin-panel.page.scss';

type Inputs = {
	category: string;
	'category in Russian': string;
	image: Array<File>;
};

function CreateCategoryPage() {
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

			const requestData: CreateCategoryRequestDto = {
				name: data.category,
				nameRU: data['category in Russian'],
				image: compressedImageFileAsString
			};

			return allEndpoints.adminPanel.createCategory(requestData);
		}
	);

	return (
		<div className="admin-panel-page__field">
			<h2 className="admin-panel-page__title">Create category:</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MyInputComponent
					label="category"
					register={register}
					error={errors.category}
					placeholder="add category"
				/>
				<MyInputComponent
					label="category in Russian"
					register={register}
					error={errors['category in Russian']}
					placeholder="add category in Russian"
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

export default CreateCategoryPage;
