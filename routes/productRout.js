const express = require('express');
const { creatProduct , getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productCtrl');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productRoutes = express.Router();

productRoutes.post('/', isLoggedIn, creatProduct);
productRoutes.get('/', getProducts);
productRoutes.get('/:id', getProduct);
productRoutes.put('/:id', isLoggedIn, updateProduct);
productRoutes.delete('/:id', isLoggedIn, deleteProduct);


module.exports = productRoutes;