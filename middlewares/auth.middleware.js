exports.loggedin = (req, res, next) => {
	if (req.session.loggedin) {
		console.log('3', req.session.user);
		res.locals.user = req.session.user
		next()
	} else {
		res.redirect('/login')
	}
} 

exports.isAuth = (req, res, next) => {
	if (req.session.loggedin) {
		console.log(13, req.session.user);
		res.locals.user = req.session.user
		res.render('index')
	} else {
		next()
	}
} 