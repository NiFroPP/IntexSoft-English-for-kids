import * as yup from 'yup';

const schema = yup.object().shape({
	'category for update': yup.string().required(),
	'new category name': yup.string().required(),
	'new category name in Russian': yup.string().required(),
	image: yup.mixed().test('required', 'Please select a file', (value) => {
		return value && value.length;
	})
});

export default schema;
