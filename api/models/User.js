const mongoose = require('mongoose');

const User = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	completed_collections: {
		type: [String],
		required: true,
	},
	creation_date: {
		type: Date,
	},
});

module.exports = mongoose.model('User', User);
