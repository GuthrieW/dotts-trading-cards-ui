const Mongoose = require('mongoose');

const User = Mongoose.Schema({
	username: {
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

module.exports = Mongoose.model('User', User);
