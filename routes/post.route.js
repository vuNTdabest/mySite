var router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware')
const post = require('../controllers/post.controller')

module.exports = app => {
	router.get('/create-post', authMiddleware.loggedin, (req, res) => {
		res.render('create-post', { user: req.session.user })
	})
	.post('/create-post', authMiddleware.loggedin, post.createPost)

	router.get('/post-content/:id', post.showPostById)
	
	app.use(router)
}