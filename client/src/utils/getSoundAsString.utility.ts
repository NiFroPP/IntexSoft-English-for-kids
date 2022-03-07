import { getBase64 } from './getBase64.utility';

export const getSoundAsString = async (data: any) => {
	let soundFileAsString = '';
	if (data.sound.length > 0) {
		const file = data.sound[0];
		soundFileAsString = await getBase64(file);
	}

	return soundFileAsString;
};
