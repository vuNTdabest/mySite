const bcrypt = require('bcrypt');
const UserDB = require('../models/user.model')

exports.create = (req, res) => {
    res.render('register', { alert: null })
}

exports.register = (req, res) => {
    try {
        if (req.body.username && req.body.email && req.body.password) {
            UserDB.findOne({ $or: [{ email: req.body.email }] })
                .then((user) => {
                    if (!user) {
                        bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashed) => {
                            const data = {
                                id: Date.now().toString(),
                                username: req.body.username,
                                email: req.body.email,
                                password: hashed
                            }
                            UserDB.insertMany([data])
                            const successAlert = "Sign-up successful!!!"
                            res.render('register', { alert: successAlert })
                        });                        
                    } else {
                        console.log("This email has been registered!")
                        const failedSignup = "This email has been registered!"
                        res.render('register', { alert: failedSignup })
                    }
                })
        } else {
            const failedSignup = "Needed to fill"
            res.render('register', { alert: failedSignup })
        }

    } catch (e) {
        console.log(e);
        const failedSignup = "Something's wrong!!!"
        res.render('register', { alert: failedSignup })
    }
}