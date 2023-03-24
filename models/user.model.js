const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://vunt_01:vunt1234@cluster0.7lkzcfz.mongodb.net/MySite')
    .then(() => {
        console.log('mongoose connected')
    })
    .catch(() => {
        console.log('failed to connect mongoose');
		console.log(process.env.DATABASE_URL);
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