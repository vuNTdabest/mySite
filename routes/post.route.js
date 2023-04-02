var router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware')

module.exports = app => {
	router.get('/post', (req, res) => {
		res.render('post', { user: req.session.user, comments: req.session.comments })
	})
	
	app.use(router)
}