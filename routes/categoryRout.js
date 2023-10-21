const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const categoryCtrl = require('../controllers/categoryCtrl');
const categoryRoute = express.Router();

categoryRoute.post('/', isLoggedIn, categoryCtrl.createCategory);
categoryRoute.get('/', categoryCtrl.getCategories);
categoryRoute.get('/:id', categoryCtrl.getCategory);
categoryRoute.put('/:id', isLoggedIn, categoryCtrl.updateCategory);
categoryRoute.delete('/:id', isLoggedIn, categoryCtrl.deleteCategory);




module.exports = categoryRoute;