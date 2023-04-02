var router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware')

module.exports = app => {
	router.get('/', authMiddleware.loggedin, (req, res) => {
		console.log('6', req.session.user);
		res.render('index', { user: req.session.user, comments: req.session.comments })
	})
	
	app.use(router)
}

