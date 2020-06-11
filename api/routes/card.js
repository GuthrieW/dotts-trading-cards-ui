const express = require('express');
const moment = require('moment-timezone');
const Card = require('../models/Card');

const router = express.Router();

/*
 * Get all cards
 */
router.get('/', async (request, response) => {
	try {
		const cards = await Card.find();
		response.json(cards);
	} catch (error) {
		response.json({ message: error });
	}

	return;
});

/*
 * Get one card by id
 */
router.get('/:cardId', async (request, response) => {
	const cardId = request.params.cardId;

	try {
		const card = await Card.findById(cardId);
		response.json(card);
	} catch (error) {
		response.json({ message: error });
	}

	return;
});

/*
 * Insert a card
 */
router.post('/', async (request, response) => {
	const cardInformation = request.body;
	const card = new Card({
		player_name: cardInformation.player_name,
		rarity: cardInformation.rarity,
		image_url: cardInformation.image_url,
		collections_ids: cardInformation.collections_ids,
		submission_username: cardInformation.submission_username,
		submission_date: moment.tz('America/Chicago').format(),
	});

	try {
		const savedCard = await card.save();
		response.json(savedCard);
	} catch (error) {
		console.log('POST ERROR: ', error);
		response.json({ message: error });
	}

	return;
});

/*
 * Delete a card
 */
router.delete('/:cardId', async (request, response) => {
	const cardId = request.params.cardId;

	try {
		const removedCard = await Card.remove({ _id: cardId });
		response.json(removedCard);
	} catch (error) {
		response.json({ message: error });
	}

	return;
});

module.exports = router;
