const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const brandCtrl = require('../controllers/brandCtrl');
const brandRoute = express.Router();

brandRoute.post('/', isLoggedIn, brandCtrl.createBrand);
brandRoute.get('/', brandCtrl.getbrands);
brandRoute.get('/:id', brandCtrl.getBrand);
brandRoute.put('/:id', isLoggedIn, brandCtrl.updateBrand);
brandRoute.delete('/:id', isLoggedIn, brandCtrl.deleteBrand);




module.exports = brandRoute;