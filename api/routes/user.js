const Express = require('express');
const HttpStatusCodes = require('http-status-codes');
const User = require('/nsfl-trading-cards/api/models/User');

const Router = Express.Router();

Router.get('/', async (request, response) => {
	try {
		const users = await User.find();
		response.status(HttpStatusCodes.OK).json(users);
	} catch (error) {
		console.error(error);
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	return;
});

Router.get('/currentUser', async (request, response) => {
	try {
		const user = await User.findById(request.user._id);
		response.status(HttpStatusCodes.OK).json(user);
	} catch (error) {
		console.error(error);
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}
});

module.exports = Router;
