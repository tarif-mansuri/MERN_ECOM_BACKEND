const express = require('express');
const userControllers = require('../controllers/userCtrl');
const userRoutes = express.Router();
const isUserLoggedIn = require('../middlewares/isLoggedIn');

userRoutes.post('/register', userControllers.registerUserCtrl);
userRoutes.post('/login', userControllers.loginUserCOntroller);
userRoutes.get('/profile', isUserLoggedIn, userControllers.userProfile);

module.exports = userRoutes;