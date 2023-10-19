const express = require('express');
const { creatProduct , getProducts } = require('../controllers/productCtrl');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productRoutes = express.Router();

productRoutes.post('/', isLoggedIn, creatProduct);
productRoutes.get('/', getProducts);


module.exports = productRoutes;