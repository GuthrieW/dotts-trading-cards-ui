const isLoggedIn = (request, response, next) => {
	if (request.user) {
		next();
	} else {
		response
			.status(HttpStatusCodes.UNAUTHORIZED)
			.json({ message: 'User not authorized' });
	}
};

module.exports = isLoggedIn;
