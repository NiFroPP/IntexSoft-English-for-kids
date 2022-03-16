import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useNavigate } from 'react-router-dom';

import schema from './create-category.validation';
import allEndpoints from '../../../api';
import { getCompressedImageAsString } from '../../../utils/getImageAsString.utility';
import PATHS from '../../../models/enum/paths.enum';
import { CreateCategoryRequestDto } from '../../../models/dto/request/createCategory.request.dto';

import MyInputComponent from '../../../components/common/MyInput/MyInput.component';
import SubmitBtn from '../../../components/common/AdminPanel/SubminBtn/SubmitBtn.component';

import '../admin-panel.page.scss';

type Inputs = {
	category: string;
	'category in Russian': string;
	image: string;
};

function CreateCategoryPage() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>({ resolver: yupResolver(schema) });

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const compressedImageFileAsString = await getCompressedImageAsString(data);

		const requestData: CreateCategoryRequestDto = {
			name: data.category,
			nameRU: data['category in Russian'],
			image: compressedImageFileAsString
		};

		await allEndpoints.adminPanel.createCategory(requestData);
		navigate(PATHS.ADMIN_PANEL);
	};

	return (
		<div className="admin-panel-page__field">
			<h2 className="admin-panel-page__title">Create category:</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MyInputComponent
					label="category"
					register={register}
					errors={errors}
					placeholder="add category"
				/>
				<MyInputComponent
					label="category in Russian"
					register={register}
					errors={errors}
					placeholder="add category in Russian"
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

export default CreateCategoryPage;
