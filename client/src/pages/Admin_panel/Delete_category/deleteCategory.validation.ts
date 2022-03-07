import * as yup from 'yup';

const schema = yup.object().shape({
	'category to delete': yup.string().required()
});

export default schema;
