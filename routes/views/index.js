var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals,
		curUser = req.session.passport.user;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.authPath = '/auth/facebook';
	if(curUser)
		locals.authPath = '/main';

	if(curUser)
		res.redirect("/main");
	else
		view.render('index');
};
