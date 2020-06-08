const Express = require('express');
const Moment = require('moment-timezone');
const Bcrypt = require('bcryptjs');
const HttpStatusCodes = require('http-status-codes');
const User = require('../models/User');
const SALT_ROUNDS = require('../common/security');
const Router = Express.Router();

Router.post('/signup', async (request, response) => {
    const signupInformation = request.body;

	Bcrypt
		.hash(signupInformation.password, SALT_ROUNDS)
		.then((hashedPassword) => {
            const user = new User({
                username: signupInformation.username,
                password: hashedPassword,
                completed_collections: signupInformation.completed_collections,
                submission_date: Moment.tz('America/Chicago').format(),
            });

            try {
                const newUser = await user.save();
                response.status(HttpStatusCodes.OK).json(newUser);
            } catch (error) {
                console.error('POST ERROR', error);
                response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
            }
        }).catch((error) => {
            console.error('BCRYPT HASH ERROR', error);
            response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(newUser);
        });

    return;
});
