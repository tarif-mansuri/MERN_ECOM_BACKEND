const express = require('express');
const userControllers = require('../controllers/userCtrl');
const userRoutes = express.Router();

userRoutes.post('/api/v1/users/register', userControllers.registerUserCtrl);
userRoutes.post('/api/v1/users/login', userControllers.loginUserCOntroller);

module.exports = userRoutes;