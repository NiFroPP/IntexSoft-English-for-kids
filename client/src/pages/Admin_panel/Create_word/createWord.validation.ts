import * as yup from 'yup';

const schema = yup.object().shape({
	'category for adding word': yup.string().required(),
	'word in English': yup.string().required(),
	'word in Russian': yup.string().required(),
	image: yup.mixed().test('required', 'Please select a file', (value) => {
		return value && value.length;
	}),
	sound: yup.mixed().test('required', 'Please select a file', (value) => {
		return value && value.length;
	})
});

export default schema;
