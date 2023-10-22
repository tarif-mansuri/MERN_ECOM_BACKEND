const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const colorCtrl = require('../controllers/colorCtrl');
const colorRoute = express.Router();

colorRoute.post('/', isLoggedIn, colorCtrl.createCOlor);
colorRoute.get('/', colorCtrl.getcolors);
colorRoute.get('/:id', colorCtrl.getColor);
colorRoute.put('/:id', isLoggedIn, colorCtrl.updateColor);
colorRoute.delete('/:id', isLoggedIn, colorCtrl.deleteColor);




module.exports = colorRoute;