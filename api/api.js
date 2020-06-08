const Express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const Cors = require('cors');
require('dotenv').config();
const App = Express();
const CardRoute = require('./routes/card');
const SignupRoute = require('./routes/signup');

const PORT = 8080;

App.use(Cors());
App.use(function (request, response, next) {
	response.header('Access-Control-Allow-Origin', '*');
	response.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});
App.use(BodyParser.urlencoded({ extended: true }));
App.use(BodyParser.json());
App.use('/card', CardRoute);
App.use('/signup', SignupRoute);

Mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('Connected to database @' + process.env.DB_CONNECTION);
	}
);

App.listen(PORT);
