const Comment = require('../models/comment.model')

exports.comment = async (req, res) => {
    if (req.body.email && req.body.comment) {
        const cmt = {
            id: Date.now().toString(),
            author: req.body.email,
            comment: req.body.comment
        }
        console.log(cmt);
        await Comment.insertMany([cmt])
        console.log( "12", req.session.user);
        // Comment.find({}).then((cmt) => {
            req.session.comments.push(cmt)
        // })
        // req.locals.comment = 
        res.render('index', {username: req.session.user.username, email: req.session.user.email,comments: req.session.comments})
        // res.redirect("/")
    } else {
        console.log("value undefined");
        res.render('err')
    }
    
}

exports.showCmt = (req, res, next) => {
    Comment.find({})
    .then((cmt) => {
        if (cmt) {
            // console.log(cmt);
            req.session.comments = cmt
            next()
        } else {
            req.locals.comments = null
        }
    })
}