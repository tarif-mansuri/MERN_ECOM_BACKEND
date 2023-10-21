const express = require('express');
const dbConnect = require('../config/dbConnect');
const dotenv = require('dotenv');
const userRoutes = require('../routes/usersRout');
const globalEHandler = require('../middlewares/globalErrHandler');
const productRoutes = require('../routes/productRout');
const categoryRoute = require('../routes/categoryRout');
const brandRoute = require('../routes/brandRout');
dotenv.config();

dbConnect();
const app = express();
//pass json data
app.use(express.json());
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productRoutes);
app.use('/api/v1/categories/', categoryRoute);
app.use('/api/v1/brands/', brandRoute);

//Error Handler
app.use(globalEHandler.nfHandeler);
app.use(globalEHandler.geHandler);
module.exports = app;