const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://vunt_01:vunt1234@cluster0.7lkzcfz.mongodb.net/MySite')
    .then(() => {
        console.log('mongoose connected')
    })
    .catch(() => {
        console.log('failed to connect mongoose');
		console.log(process.env.DATABASE_URL);
    })

const commentSchema = new mongoose.Schema({
    author: String,
    comment: String
});

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment