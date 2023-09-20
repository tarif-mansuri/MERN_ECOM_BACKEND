const express = require('express');
const dbConnect = require('../config/dbConnect');
const dotenv = require('dotenv');
const userRoutes = require('../routes/usersRout');
dotenv.config();

dbConnect();
const app = express();
//pass json data
app.use(express.json());
app.use('/', userRoutes);

module.exports = app;