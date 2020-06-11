const Express = require('express');
const HttpStatusCodes = require('http-status-codes');
const User = require('./../models/User');

const Router = Express.Router();

/*
 * Get a user
 */
Router.get('/', async (request, response) => {
	try {
		response.status(HttpStatusCodes.OK).json(request.user);
	} catch (error) {
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	return;
});

module.exports = Router;
