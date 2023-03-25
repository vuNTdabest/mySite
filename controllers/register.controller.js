const bcrypt = require('bcrypt');
const UserDB = require('../models/user.model')

exports.create = (req, res) => {
    res.render('register', { alert: null })
}

exports.register = (req, res) => {
    try {
        const { username, email, password } = req.body
        if (username && email && password) {
            UserDB.findOne({ $or: [{ email: req.body.email }] })
                .then((user) => {
                    if (!user) {
                        const hashedPw = bcrypt.hash(req.body.password, 10)
                        const data = {
                            id: Date.now().toString(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hashedPw
                        }
                        UserDB.insertMany([data])
                        const successAlert = "Sign-up successful!!!"
                        res.render('login', { alert: successAlert })
                    } else {
                        console.log("This email has been registered!")
                        const failedSignup = "This email has been registered!"
                        res.render('register', { alert: failedSignup })
                    }
                })
        } else {
            console.log("This email has been registered!")
            const failedSignup = "Needed to fill"
            res.render('register', { alert: failedSignup })
        }

    } catch (e) {
        console.log(e);
        const failedSignup = "Needed to fill"
        res.render('register', { alert: failedSignup })
    }
}