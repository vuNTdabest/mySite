var router = require('express').Router()
const comment = require('../controllers/comment.controller')
const authMiddleware = require('../middlewares/auth.middleware')

module.exports = app => {
    router.get('/')
    .post('/comment', authMiddleware.isAuth, comment.comment)

    app.use(router)
}

