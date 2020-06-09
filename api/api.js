const Express = require('express');
const ExpressSession = require('express-session');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const Passport = require('passport');
const Cors = require('cors');
require('dotenv').config();
const App = Express();
const CardRoute = require('./routes/card');
const AuthRoute = require('./routes/auth');

const PORT = 8080;

App.use(Cors());

App.use(BodyParser.urlencoded({ extended: true }));
App.use(BodyParser.json());

App.use(Passport.initialize());
App.use(Passport.session);
App.use(
	ExpressSession({
		secret: 'secret-key',
		resave: false,
		saveUninitialized: false,
	})
);

// App.use('/card', CardRoute);
App.use('/auth', AuthRoute);

Mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('Connected to database @' + process.env.DB_CONNECTION);
	}
);

App.listen(PORT);
