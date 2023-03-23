//Importing libraries that installed by npm
const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const collection = require('./mongodb')

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('MySite Project/public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/register', (req, res) => {
    res.render("register");
});

app.post('/register', async (req, res) => {
    try {
        const hashedPw = await bcrypt.hash(req.body.password, 10)
        const data = {
            id: Date.now().toString(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPw
        }

        await collection.insertMany([data])
        res.redirect('/login')
    } catch (e) {
        console.log(e)
        res.redirect('/register')
    }
})

app.post('/login', async (req, res) => {
    try {
        collection.findOne({$or: [{email: req.body.email}]})
        .then(collection => {
            if(collection) {
                bcrypt.compare(req.body.password, collection.password, function(err, result) {
                    if (err) {
                        res.send(err)
                    }
                    if(result) {
                        res.render('index')
                    } else {
                        res.send("Password does not matched!")
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