const mongoose = require('mongoose')

const uri = 'mongodb+srv://vunt_01:vunt1234@cluster0.7lkzcfz.mongodb.net/MySite'

mongoose.connect(uri)
    .then(() => {
        console.log(11, 'mongoose connected')
    })
    .catch(() => {
        console.log(14, 'failed to connect mongoose');
    })

const commentSchema = new mongoose.Schema({
    author: String,
    comment: String
});

const Comment = mongoose.model('comments', commentSchema)

module.exports = Comment