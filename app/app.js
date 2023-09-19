const express = require('express');
const dbConnect = require('../config/dbConnect');
const dotenv = require('dotenv');
dotenv.config();

dbConnect();
const app = express();

module.exports = app;