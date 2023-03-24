const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://vunt_01:vunt1234@cluster0.7lkzcfz.mongodb.net/MySite')
.then(() => {
    console.log('mongodb connected')
})
.catch(() => {
    console.log('failed to connect mongodb');
})

// const connection = mongoose.connect('mongodb+srv://vunt_01:vunt1234@cluster0.7lkzcfz.mongodb.net/MySite');

// connection.connect(error => {
//     if (error) throw error;
//     console.log('mongodb connected');
// })

const LogInSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const collection = new mongoose.model('LoginSignupCollection', LogInSchema)

module.exports=collection