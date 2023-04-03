exports.loggedin = (req, res, next) => {
	if (req.session && req.session.user) {
		res.locals.user = req.session.user
		next()
	} else {
		res.redirect('/login')
	}
} 

exports.isAuth = (req, res, next) => {
	if (req.session && req.session.user) {
		console.log(13, req.session.user);
		res.locals.user = req.session.user
		res.render('index')
	} else {
		next()
	}
} 