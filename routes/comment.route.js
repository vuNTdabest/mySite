var router = require('express').Router()
const comment = require('../controllers/comment.controller')
const authMiddleware = require('../middlewares/auth.middleware')

module.exports = app => {
    router.get('/')
    .post('/comment', authMiddleware.loggedin, comment.comment, comment.showCmt, (req, res) => {
        res.render('index', { user: req.session.user,
            comments: req.session.comments,
            posts: req.session.posts, })
    });

    router.get('/deleteCmt/:id', authMiddleware.loggedin, comment.deleteCmt, comment.showCmt, (req, res) => {
        res.render('index', { user: req.session.user,
            comments: req.session.comments,
            posts: req.session.posts, })
    })

    app.use(router)
}

