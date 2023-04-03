var router = require('express').Router()
const comment = require('../controllers/comment.controller')
const authMiddleware = require('../middlewares/auth.middleware')

module.exports = app => {
    router.get('/')
    .post('/comment', authMiddleware.loggedin, comment.comment)

    app.use(router)
}

