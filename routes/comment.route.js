var router = require('express').Router()
const comment = require('../controllers/comment.controller')

module.exports = app => {
    router.get('/')
    .post('/comment', comment.comment)

    app.use(router)
}

