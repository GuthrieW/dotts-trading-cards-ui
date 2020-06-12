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

module.exports = Router;
