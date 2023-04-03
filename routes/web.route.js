var router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware')
const cmt = require('../controllers/comment.controller')
const posts = require('../controllers/post.controller')

module.exports = app => {
	// router.get('/', authMiddleware.loggedin, (req, res) => {
	// 	console.log('6', req.session.user);
	// 	res.render('index', { user: req.session.user, comments: req.session.comments })
	// })

	app.get('/', cmt.showCmt, posts.showPost, (req, res) => {
		if (typeof req.session.user !== undefined) {
			res.render('index', { user: req.session.user, comments: req.session.comments, posts: req.session.posts })
		} else {
			res.render('index', { user: null, comments: req.session.comments, posts: req.session.posts });
		}
	});
	
	app.use(router)
}

