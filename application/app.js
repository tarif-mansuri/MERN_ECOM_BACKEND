const express = require('express');
const dbConnect = require('../config/dbConnect');
const dotenv = require('dotenv');
const userRoutes = require('../routes/usersRout');
const globalEHandler = require('../middlewares/globalErrHandler');
const productRoutes = require('../routes/productRout');
const categoryRoute = require('../routes/categoryRout');
dotenv.config();

dbConnect();
const app = express();
//pass json data
app.use(express.json());
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productRoutes);
app.use('/api/v1/categories/', categoryRoute);

//Error Handler
app.use(globalEHandler.nfHandeler);
app.use(globalEHandler.geHandler);
module.exports = app;