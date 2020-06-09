const Express = require('express');
const Moment = require('moment-timezone');
const HttpStatusCodes = require('http-status-codes');
const User = require('../models/User');
const Router = Express.Router();

Router.get('/', async (request, response) => {
	try {
		response.status(HttpStatusCodes.OK).json({ message: 'HELLO WORLD!' });
	} catch (error) {
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	return;
});

Router.post('/signup', async (request, response) => {
	const signupInformation = request.body;
	const user = new User({
		username: signupInformation.username,
		completed_collections: signupInformation.completed_collections,
		creation_date: Moment.tz('America/Chicago').format(),
	});

	try {
		const newUser = await user.save();
		response.status(HttpStatusCodes.OK).json(newUser);
	} catch (error) {
		console.error('POST ERROR', error);
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	return;
});

module.exports = Router;
