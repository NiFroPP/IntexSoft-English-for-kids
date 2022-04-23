import { getCompressImgBase64 } from './getComressImgBase64.utility';

type ImageData = {
	image: Array<File>
}

export const getCompressedImageAsString = async (data: ImageData) => {
	let resizeImageFile = '';

	if (data.image.length > 0) {
		const file = data.image[0];
		resizeImageFile = await getCompressImgBase64(file, 150);
	}

	return resizeImageFile;
};
