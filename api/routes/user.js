const Express = require('express');
const HttpStatusCodes = require('http-status-codes');
const User = require('/nsfl-trading-cards/api/models/User');

const Router = Express.Router();

Router.get('/', async (request, response) => {
	try {
		const users = await User.find();
		response.status(HttpStatusCodes.OK).json(users);
	} catch (error) {
		console.error(error);
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	return;
});

Router.patch('/username', async (request, response) => {
	const newUsername = request.body.nsfl_username;
	console.log(typeof newUsername);
	const userId = request.user._id;
	console.log(userId);
	try {
		await User.updateOne(
			{ _id: userId },
			{ $set: { nsfl_username: newUsername } }
		);
		response.status(HttpStatusCodes.OK).json({ message: 'success' });
	} catch (error) {
		console.error(error);
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}
});

Router.post('/', async (request, response) => {
	const userInformation = request.body;
	const userId = userInformation.userId;

	try {
		const user = await User.findById(userId);
		response.status(HttpStatusCodes.OK).json(user);
	} catch (error) {
		console.error(error);
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}
});

Router.get('/canPurchasePack', async (request, response) => {
	const userId = request.user._id;

	try {
		const user = await User.findById(userId);
		const canPurchasePack = user.canPurchasePack;
		response.status(HttpStatusCodes.OK).json(canPurchasePack);
	} catch (error) {
		console.error(error);
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}
});

Router.get('/currentUser', async (request, response) => {
	const userId = request.user._id;

	try {
		const user = await User.findById(userId);
		response.status(HttpStatusCodes.OK).json(user);
	} catch (error) {
		console.error(error);
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}
});

module.exports = Router;