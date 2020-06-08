const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 8080;

const cardRoute = require('./routes/card');

app.use(cors());
app.use(function (request, response, next) {
	response.header('Access-Control-Allow-Origin', '*');
	response.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/card', cardRoute);

app.get('/', (request, response) => {
	response.send('THINGS');
});

app.get('/card', (request, response) => {
	response.send('THIS IS IT!');
});

mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('Connected to database @' + process.env.DB_CONNECTION);
	}
);

app.listen(PORT);
