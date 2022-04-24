import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import schema from './delete-category.validation';
import allEndpoints from '../../../api';
import useRequestByFormData from '../hooks/useRequestByFormData';
import { DeleteCategoryRequestDto } from '../../../models/dto/request/delete-category.request.dto';

import MyInputComponent from '../../../components/common/MyInput/my-input.component';
import SubmitBtn from '../../../components/common/AdminPanel/SubminBtn/submit-btn.component';

import '../admin-panel.page.scss';

type Inputs = {
	'category to delete': string;
};

function DeleteCategoryPage() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>({ resolver: yupResolver(schema) });
	const [disabled, responseErr, onSubmit] = useRequestByFormData<Inputs>(
		(data) => {
			const requestData: DeleteCategoryRequestDto = {
				name: data['category to delete']
			};

			return allEndpoints.adminPanel.deleteCategory(requestData);
		}
	);

	return (
		<div className="admin-panel-page__field">
			<h2 className="admin-panel-page__title">Delete category:</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MyInputComponent
					label="category to delete"
					register={register}
					error={errors['category to delete']}
					placeholder="name"
				/>
				<SubmitBtn disabled={disabled} />
			</form>
			{responseErr ? (
				<h2 className="login-page__error">{responseErr}</h2>
			) : null}
		</div>
	);
}

export default DeleteCategoryPage;
