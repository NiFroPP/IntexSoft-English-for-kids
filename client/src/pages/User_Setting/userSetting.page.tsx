import React, { FormEvent, useState } from 'react';

import { getCompressImgBase64 } from '../../utils/getComressImgBase64.utility';
import { getBase64 } from '../../utils/getBase64.utility';

import './userSetting.page.scss';

function UserSettingPage() {
	const [imgBase64, setImgBase64] = useState('');
	const [error, setError] = useState('');

	const changeImg = async (e: FormEvent) => {
		try {
			const target = e.target as HTMLInputElement;
			const file: File = (target.files as FileList)[0];
			console.log(file);

			// const resizeFile = await getCompressImgBase64(file, 150);
			// console.log(resizeFile);

			// const base64File = await getBase64(file);
			// setImgBase64(base64File);
			// console.log(base64File);
		} catch (e: any) {
			setError(e.message);
		}
	};

	if (error) return <h2>{error}</h2>;

	return (
		<div className="setting-page">
			<label htmlFor="input__image-load">
				Load image
				<input
					type="file"
					id="input__image-load"
					// accept="image/*"
					onInput={(e) => changeImg(e)}
				/>
			</label>
		</div>
	);
}

export default UserSettingPage;
