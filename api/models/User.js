const Mongoose = require('mongoose');

const User = Mongoose.Schema({
	google_id: {
		type: String,
		required: true,
	},
	google_display_name: {
		type: String,
		required: true,
	},
	completed_collections: {
		type: [String],
		required: true,
	},
	owned_cards: {
		type: [String],
		requied: true,
	},
	creation_date: {
		type: Date,
	},
});

module.exports = Mongoose.model('User', User);
