const Post = require('../models/post.model')

exports.createPost = async(req, res) => {
    try {
        if (req.body.title && req.body.content) {
            const post = new Post({
                title: req.body.title,
                content: req.body.content,
                author: req.session.user.email
            })

            const postData = await post.save()

            res.render('create-post', { message: 'Post added Successfully!' })
        }
    } catch (error) {
        
    }
}

exports.showPost = (req, res, next) => {
    Post.find({}).then((posts) => {
        if(posts) {
            req.session.posts = posts
            next()
        } else {
            req.session.posts = null
        }
    })
}