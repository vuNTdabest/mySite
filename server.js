//Importing libraries that installed by npm
const express = require('express');
const app = express();
// const bcrypt = require('bcrypt');
// const UserDB = require('./models/user.model')
const cmt = require('./controllers/comment.controller')
const session = require('express-session')

require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))


app.get('/', cmt.showCmt, (req, res) => {
    if (req.session.user != undefined) {
        res.render('index', { username: req.session.user.username, email: req.session.user.email, comments: req.session.comments })
    } else {
        res.render('index', { username: null, email: null, comments: req.session.comments  });
    }
});

app.get('/', (req, res) => {
    res.render('index')
})


app.get('/500', (req, res) => {
    res.render('err')
})

app.get('/404', (req, res) => {
    res.render('404')
})

require('./routes/auth.route')(app)
require('./routes/web.route')(app)
require('./routes/comment.route')(app)

app.listen(process.env.PORT, function () {
    console.log('server runnings: http://localhost:' + process.env.PORT);
});