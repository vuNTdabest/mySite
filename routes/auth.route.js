var router = require('express').Router();
const login = require('../controllers/login.controller')
const register = require('../controllers/register.controller')
const authMiddleware = require('../middlewares/auth.middleware')

module.exports = app => {
	router.get('/login', authMiddleware.isAuth, login.showLoginForm)
	.post('/login', login.login);

	router.get('/register', authMiddleware.isAuth, register.create)
	.post('/register', register.register);

	router.get('/logout', authMiddleware.loggedin, login.logout);

	app.use(router)
}