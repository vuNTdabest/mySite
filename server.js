//Importing libraries that installed by npm
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const UserDB = require('./models/user.model')

require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));



// Routes
app.get('/', (req, res) => {
    res.render('index', { username: null });
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/register', (req, res) => {
    res.render("register", { alert: null });
});

app.post('/register', (req, res) => {
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
})

app.post('/login', async (req, res) => {
    try {
        UserDB.findOne({ $or: [{ email: req.body.email }] })
            .then((user) => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        if (err) {
                            res.send(err)
                        }
                        if (result) {
                            res.render('index', { username: user.username });
                            // res.render('index')
                        } else {
                            res.send("Password does not matched!")
                            // const conflictE = "Password does not matched!"
                            // res.render('login', { email, password, username, conflictE })
                        }
                    })
                } else {
                    res.send("No user found!")
                }
            })
    } catch (e) {
        console.log(e)
        res.redirect('/login')
    }
})

// End routes

app.listen(process.env.PORT, function () {
    console.log('server runnings: http://localhost:' + process.env.PORT);
});