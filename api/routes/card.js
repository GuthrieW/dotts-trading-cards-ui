const Express = require('express');
const Moment = require('moment-timezone');
const HttpStatusCodes = require('http-status-codes');
const Card = require('../models/Card');
const Router = Express.Router();

/*
 * Get all cards
 */
Router.get('/', async (request, response) => {
	try {
		const cards = await Card.find();
		response.status(HttpStatusCodes.OK).json(cards);
	} catch (error) {
		response
			.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: error });
	}

	return;
});

/*
 * Get one card by id
 */
Router.get('/:cardId', async (request, response) => {
	const cardId = request.params.cardId;

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

/*
 * Insert a card
 */
Router.post('/', async (request, response) => {
	const cardInformation = request.body;
	console.log(cardInformation);
	const card = new Card({
		player_name: cardInformation.player_name,
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

/*
 * Delete a card
 */
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
