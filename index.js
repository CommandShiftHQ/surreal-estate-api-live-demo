const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const postProperty = require('./controllers/Property/index.js');

const app = express();
app.use(bodyParser.json());

dotenv.config({ path: './settings.env' });

mongoose.connect(process.env.DATABASE_CONN, { useNewUrlParser: true });

app.post('/PropertyListing', postProperty);

app.listen(3000, () => {
    console.log('Surreal Estate API is running on 3000');
});
