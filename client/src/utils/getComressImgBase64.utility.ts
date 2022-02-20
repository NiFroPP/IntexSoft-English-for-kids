export const getCompressImgBase64 = (
	file: File,
	height: number
): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const img = new Image();
			img.src = reader.result as string;
			img.onload = () => {
				const scaleFactor = height / img.height;
				const canvas = document.createElement('canvas');
				canvas.width = img.width * scaleFactor;
				canvas.height = height;
				const ctx = canvas.getContext('2d');
				if (ctx) {
					ctx.drawImage(img, 0, 0, img.width * scaleFactor, height);
					resolve(ctx.canvas.toDataURL(String(img)));
				}
			};
		};
		reader.onerror = () => reject(reader.error);
	});
