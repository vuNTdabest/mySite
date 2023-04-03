const mongoose = require('mongoose');

const addPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

const postCollections = new mongoose.model('posts', addPostSchema)

module.exports = postCollections