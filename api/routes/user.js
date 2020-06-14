const Express = require('express');
const HttpStatusCodes = require('http-status-codes');
const User = require('/nsfl-trading-cards/api/models/User');
const saveAction = require('/nsfl-trading-cards/api/common/saveAction');

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

Router.get('/isAdmin', async (request, response) => {
	const userIsAdmin = request.user.is_admin;
	response.status(HttpStatusCodes.OK).json(userIsAdmin);
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

Router.get('/canPurchasePack', async (request, response) => {
	const userId = request.user._id;

	try {
		const user = await User.findById(userId);
		const canPurchasePack = user.can_purchase_pack;
		response.status(HttpStatusCodes.OK).json(canPurchasePack);
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

Router.patch('/username', async (request, response) => {
	const userId = request.user._id;
	const oldUsername = request.user.nsfl_username;
	const newUsername = request.body.nsfl_username;
	saveAction(
		userId,
		'Change Username',
		`NSFL username changed from ${oldUsername} to ${newUsername}`
	);

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

Router.patch('/resetCanPurchasePack', async (request, response) => {
	const userId = request.user._id;
	saveAction(
		userId,
		'Reset Can Purchase Pack Username',
		'can_purchase_pack set to true for all users'
	);

	const currentUser = await User.findById(userId);
	try {
		if (currentUser.is_admin) {
			await User.update(
				{ can_purchase_pack: false },
				{ $set: { can_purchase_pack: true } }
			);
			response.status(HttpStatusCodes.OK).json({ message: 'success' });
		} else {
			response.status(HttpStatusCodes.OK).json({ message: 'failure' });
		}
	} catch (error) {
		console.error(error);
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}
});

module.exports = Router;
