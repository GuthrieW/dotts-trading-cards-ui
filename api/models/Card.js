const mongoose = require('mongoose');

const Card = mongoose.Schema({
	player_name: {
		type: String,
		required: true,
	},
	rarity: {
		type: String,
		required: true,
	},
	image_url: {
		type: String,
		required: true,
	},
	collections_ids: {
		type: [String],
		required: true,
	},
	submission_username: {
		type: String,
		required: true,
	},
	submission_date: {
		type: Date,
	},
});

module.exports = mongoose.model('Card', Card);