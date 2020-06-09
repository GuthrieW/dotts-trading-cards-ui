const Express = require('express');
const Router = Express.Router();
// const Passport = require('passport');
const PassportGoogle = require('../middleware/passport-setup');

Router.get(
	'/auth/google',
	PassportGoogle.authenticate('google', {
		scope: 'profile',
	})
);

Router.get(
	'/auth/google/callback',
	PassportGoogle.authenticate('google', {
		failureRedirect: '/signin',
	}),
	(request, response) => {
		response.json(request.user);
	}
);

Router.get('/signout');

module.exports = Router;
