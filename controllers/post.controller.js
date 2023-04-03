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

exports.showPostById = (req, res) => {
    try {
        Post.findOne({ _id: req.param("id") })
        .then((post) => {
            if(post) {
                req.session.post = post
                res.render('post-content', { user: req.session.user, post: req.session.post })
            } else {
                const failAlert = "No content found!"
                res.render('post-content', { alert:failAlert, user: req.session.user, post: req.session.post })
            }
        })
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
}