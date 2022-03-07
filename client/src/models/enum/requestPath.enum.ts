enum REQUEST_PATH {
	LOGIN = '/users/login',
	REGISTRATION = '/users/registration',
	GET_ALL_CATEGORIES = '/categories/get/all',
	GET_ONE_CATEGORY = '/categories/get/one',
	GET_ALL_WORDS = '/categories/get/words',
	CREATE_CATEGORY = '/categories/add',
	UPDATE_CATEGORY = '/categories/update',
	DELETE_CATEGORY = '/categories/delete',
	CREATE_CARD = '/categories/cards/add',
	UPDATE_CARD = '/categories/cards/update',
	DELETE_CARD = '/categories/cards/delete'
}

export default REQUEST_PATH;
