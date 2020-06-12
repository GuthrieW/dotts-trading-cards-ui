const Express = require('express');
const Moment = require('moment-timezone');
const HttpStatusCodes = require('http-status-codes');
const _filter = require('lodash/filter');
const User = require('/nsfl-trading-cards/api/models/User');
const Card = require('/nsfl-trading-cards/api/models/Card');

const Router = Express.Router();

Router.get('/cards', async (request, response) => {
	try {
		const cards = await Card.find();
		response.status(HttpStatusCodes.OK).json(cards);
	} catch (error) {
		console.error(error);
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	return;
});

Router.post('/card', async (request, response) => {
	const cardInformation = request.body;
	const cardId = cardInformation.cardId;

	try {
		const card = await Card.findById(cardId);
		response.status(HttpStatusCodes.OK).json(card);
	} catch (error) {
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	return;
});

Router.post('/team', async (request, response) => {
	const cardInformation = request.body;
	const teamName = cardInformation.teamName;
	let userCards = [];
	let allCards = [];

	try {
		const user = await User.findById(request.user._id);
		userCards = user.owned_cards;
	} catch (error) {
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	try {
		allCards = await Card.find({ player_team: teamName });
	} catch (error) {
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	const filteredCards = _filter(allCards, (card) => {
		return userCards.includes(card._id);
	});

	response.status(HttpStatusCodes.OK).json(filteredCards);

	return;
});

Router.post('/team/:userId', async (request, response) => {
	const userId = request.params.cardId;
	const cardInformation = request.body;
	const teamName = cardInformation.teamName;
	let userCards = [];
	let allCards = [];

	try {
		const user = await User.findById(userId);
		userCards = user.owned_cards;
	} catch (error) {
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	try {
		allCards = await Card.find({ player_team: teamName });
	} catch (error) {
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	const filteredCards = _filter(allCards, (card) => {
		return userCards.includes(card._id);
	});

	response.status(HttpStatusCodes.OK).json(filteredCards);

	return;
});

Router.post('/', async (request, response) => {
	const cardInformation = request.body;
	const card = new Card({
		player_name: cardInformation.player_name,
		player_team: cardInformation.player_team,
		rarity: cardInformation.rarity,
		image_url: cardInformation.image_url,
		collections_ids: cardInformation.collections_ids,
		submission_username: cardInformation.submission_username,
		submission_date: Moment.tz('America/Chicago').format(),
	});

	try {
		const savedCard = await card.save();
		response.status(HttpStatusCodes.OK).json(savedCard);
	} catch (error) {
		console.error('POST ERROR: ', error);
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	return;
});

Router.delete('/:cardId', async (request, response) => {
	const cardId = request.params.cardId;

	try {
		const removedCard = await Card.remove({ _id: cardId });
		response.status(HttpStatusCodes.OK).json(removedCard);
	} catch (error) {
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	return;
});

module.exports = Router;
