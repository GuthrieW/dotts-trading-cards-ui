const Express = require('express');
const Moment = require('moment-timezone');
const Bcrypt = require('bcryptjs');
const HttpStatusCodes = require('http-status-codes');
const User = require('../models/User');
const SALT_ROUNDS = require('../common/security');
const Http

const Router = Express.Router();

const VALIDATION_FAILURE = 'Incorrect username or password.';
const VALIDATION_SUCCESS = 'Successfully logged in';

Router.post('/login', async (request, response) => {
	const loginInformation = request.body;
	const possibleUser = await User.findOne({
		username: loginInformation.username,
	}).exec();

	if (!user) {
		console.log('Incorrect username');
	}

	Bcrypt.compare(loginInformation.password, possibleUser.password)
		.then((result) => {
			if (result) {
				response.status(HttpStatusCodes.OK).json({ message: VALIDATION_SUCCESS });
			} else {
				console.log('Incorrect passsword');
				response.status(HttpStatusCodes.UNAUTHORIZED).json({ message: VALIDATION_FAILURE });
			}
		})
		.catch((error) => {
			console.error('BCRYT COMPARE ERROR', error);
		});

	Bcrypt.compare(loginInformation.password, SALT_ROUNDS);

	return;
});
