const express = require('express');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const SALT_ROUNDS = require('../common/security');

const router = express.Router();

const VALIDATION_FAILURE = 'Incorrect username or password.';
const VALIDATION_SUCCESS = 'Successfully logged in';

router.post('/login', async (request, response) => {
	const loginInformation = request.body;

	const possibleUser = await User.findOne({
		username: loginInformation.username,
	}).exec();

	if (!user) {
		console.log('Incorrect username');
	}

	bcrypt
		.compare(loginInformation.password, possibleUser.password)
		.then((result) => {
			if (result) {
				response.status(200).json({ message: VALIDATION_SUCCESS });
			} else {
				console.log('Incorrect passsword');
				response.status(400).json({ message: VALIDATION_FAILURE });
			}
		})
		.catch((error) => {
			console.error('BCRYT COMPARE ERROR', error);
		});

	bcrypt.compare(loginInformation.password, SALT_ROUNDS);

	return;
});
