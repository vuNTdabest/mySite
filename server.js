//Importing libraries that installed by npm
const express = require('express');
const app = express();
// const cmt = require('./controllers/comment.controller')
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

app.get('/500', (req, res) => {
    res.render('err')
})

app.get('/404', (req, res) => {
    res.render('404')
})

require('./routes/auth.route')(app)
require('./routes/web.route')(app)
require('./routes/comment.route')(app)
require('./routes/post.route')(app)

app.listen(process.env.PORT, function () {
    console.log('server runnings: http://localhost:' + process.env.PORT);
});