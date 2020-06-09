const User = require('./../models/User');
const Express = require('express');
const Router = Express.Router();
const HttpStatusCodes = require('http-status-codes');
const AuthorizationCheck = require('./../middleware/authorization');

/*
 * Get a user
 */
Router.get('/', AuthorizationCheck, async (request, response) => {
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
