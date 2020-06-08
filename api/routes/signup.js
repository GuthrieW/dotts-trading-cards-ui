const Express = require('express');
const Moment = require('moment-timezone');
const Bcrypt = require('bcryptjs');
const HttpStatusCodes = require('http-status-codes');
const User = require('../models/User');
const SALT_ROUNDS = require('../common/security');
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
	console.log('Got in here');

	const signupInformation = request.body;
	const hashedPassword = await Bcrypt.hash(
		signupInformation.password,
		SALT_ROUNDS
	);
	const user = new User({
		username: signupInformation.username,
		password: hashedPassword,
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

module.exports = router;
