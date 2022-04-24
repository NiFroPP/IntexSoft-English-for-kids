import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useNavigate } from 'react-router-dom';

import schema from './delete-category.validation';
import allEndpoints from '../../../api';
import { useActions } from '../../../hooks/useActions';
import PATHS from '../../../models/enum/paths.enum';
import { DeleteCategoryRequestDto } from '../../../models/dto/request/delete-category.request.dto';

import MyInputComponent from '../../../components/common/MyInput/my-input.component';
import SubmitBtn from '../../../components/common/AdminPanel/SubminBtn/submit-btn.component';

import '../admin-panel.page.scss';

type Inputs = {
	'category to delete': string;
};

function DeleteCategoryPage() {
	const [responseErr, setResponseErr] = useState('');
	const [disabled, setDisabled] = useState(false);
	const navigate = useNavigate();
	const { fetchCategories } = useActions();
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

		const response = await allEndpoints.adminPanel.deleteCategory(requestData);

		if (response.error) {
			setResponseErr(response.data.message);
			setDisabled(false);
		} else {
			fetchCategories();
			navigate(PATHS.ADMIN_PANEL);
		}
	};

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
