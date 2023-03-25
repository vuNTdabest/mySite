const bcrypt = require('bcrypt');
const UserDB = require('../models/user.model')

exports.showLoginForm = (req, res) => {
	res.render('login', { alert: null })
}

exports.login = (req, res) => {
    try {
        UserDB.findOne({ $or: [{ email: req.body.email }] })
            .then((user) => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        if (err) {
                            const failedLogin = "Password does not matched!"
                            res.render('login', { alert: failedLogin })
                        }
                        if (result) {
                            res.render('index', { username: user.username });
                            // res.render('index')
                        } else {
                            const failedLogin = "Password does not matched!"
                            res.render('login', { alert: failedLogin })
                        }
                    })
                } else {
                    const failAlert = "No user found!"
                    res.render('login', { alert:failAlert })
                }
            })
    } catch (e) {
        console.log(e)
        res.redirect('/login')
    }
}

exports.logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) res.redirect('/500')
			res.redirect('/home')
	})
}






