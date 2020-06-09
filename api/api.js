const Express = require('express');
// const ExpressSession = require('express-session');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const Passport = require('passport');
const CookieSession = require('cookie-session');
const Cors = require('cors');
require('dotenv').config();
const App = Express();
const CardRoute = require('./routes/card');
const AuthRoute = require('./routes/auth');
const ProfileRoute = require('./routes/profile');

const DAY_IN_MILLISECONDS = 86400000;
const MAX_COOKIE_AGE = DAY_IN_MILLISECONDS;
const PORT = 8080;

// CORS
App.use(Cors());

App.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
	response.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Body Parser
App.use(BodyParser.urlencoded({ extended: true }));
App.use(BodyParser.json());

// Cookie Session
App.use(
	CookieSession({
		maxAge: MAX_COOKIE_AGE,
		keys: [process.env.COOKIE_SESSION_KEY],
	})
);

// Passport
App.use(Passport.initialize());
App.use(Passport.session());

// Routes
App.use('/card', CardRoute);
App.use('/auth', AuthRoute);
App.use('/profile', ProfileRoute);

// MonogDB Connection
Mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('Connected to database @' + process.env.DB_CONNECTION);
	}
);

App.listen(PORT);
