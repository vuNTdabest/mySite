var router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware')

module.exports = app => {
	router.get('/', authMiddleware.loggedin, (req, res) => {
		console.log('6', req.session.user);
		res.render('index', { username: req.session.user.username, email: req.session.user.email, comments: req.session.comments })
	})
	
	app.use(router)
}

