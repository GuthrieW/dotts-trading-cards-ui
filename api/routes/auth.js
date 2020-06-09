const Express = require('express');
const Router = Express.Router();
const PassportGoogle = require('../middleware/passport-setup');

Router.get(
	'/google',
	PassportGoogle.authenticate('google', {
		scope: 'profile',
	})
);

Router.get(
	'/google/callback/',
	PassportGoogle.authenticate('google'),
	(request, response) => {
		response.redirect('/profile');
	}
);

Router.get('/logout', (request, response) => {
	request.logout();
	response.redirect('/signin');
});

module.exports = Router;
