const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

const PORT = 8080;

const cardRoute = require('./routes/card');

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
		console.log('Connected to database.');
	}
);

app.listen(PORT);
