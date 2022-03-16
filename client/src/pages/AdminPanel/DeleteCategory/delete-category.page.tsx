import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useNavigate } from 'react-router-dom';

import schema from './delete-category.validation';
import allEndpoints from '../../../api';
import PATHS from '../../../models/enum/paths.enum';
import { DeleteCategoryRequestDto } from '../../../models/dto/request/delete-category.request.dto';

import MyInputComponent from '../../../components/common/MyInput/my-input.component';
import SubmitBtn from '../../../components/common/AdminPanel/SubminBtn/submit-btn.component';

import '../admin-panel.page.scss';

type Inputs = {
	'category to delete': string;
};

function DeleteCategoryPage() {
	const [disabled, setDisabled] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>({ resolver: yupResolver(schema) });

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setDisabled(true);
		const requestData: DeleteCategoryRequestDto = {
			name: data['category to delete']
		};

		await allEndpoints.adminPanel.deleteCategory(requestData);
		navigate(PATHS.ADMIN_PANEL);
	};

	return (
		<div className="admin-panel-page__field">
			<h2 className="admin-panel-page__title">Delete category:</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MyInputComponent
					label="category to delete"
					register={register}
					errors={errors}
					placeholder="name"
				/>
				<SubmitBtn disabled={disabled} />
			</form>
		</div>
	);
}

export default DeleteCategoryPage;
