const express = require('express');
const { creatProduct } = require('../controllers/productCtrl');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productRoutes = express.Router();

productRoutes.post('/register',isLoggedIn, creatProduct);


module.exports = productRoutes;