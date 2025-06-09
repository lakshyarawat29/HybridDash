const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
app.use(cors());
app.use(express.json());


app.use('/dashboard',routes);

//global error Handlers
app.use(errorHandler);

module.exports = app;