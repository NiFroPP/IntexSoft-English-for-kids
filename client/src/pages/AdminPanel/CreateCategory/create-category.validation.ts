import * as yup from 'yup';

const schema = yup.object().shape({
	category: yup.string().required(),
	'category in Russian': yup.string().required(),
	image: yup.mixed().test('required', 'Please select a file', (value) => {
		return value && value.length;
	})
});

export default schema;
