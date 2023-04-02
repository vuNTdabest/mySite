const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        console.log(5, 'mongoose connected')
    })
    .catch(() => {
        console.log(8, 'failed to connect mongoose');
    })

const SignUpSchema = new mongoose.Schema({
    username: {
		type: String,
		required: true,
		lowercase: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	}
})

const UserDB = new mongoose.model('users', SignUpSchema)

module.exports = UserDB