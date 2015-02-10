/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone'),
	middleware = require('./middleware'),
	passport = require('passport'), 
	FacebookStrategy = require('passport-facebook').Strategy,
	importRoutes = keystone.importer(__dirname),
	Users = keystone.list('Users');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', passport.initialize());
keystone.pre('routes', passport.session());
keystone.pre('render', middleware.flashMessages);

passport.serializeUser(function (pUser, pCallback) {
	pCallback(null, { id: pUser.uid, name: pUser.name });
});
passport.deserializeUser(function (pUser, pCallback) {  
	Users.findOne(pUser, pCallback);
});
passport.use(new FacebookStrategy({
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: "/auth/facebook/callback"
	}, function(accessToken, refreshToken, profile, done) {
		Users.findOrCreate(accessToken, refreshToken, profile, done);
	}
));

// Import Route Controllers
var routes = {
	api: importRoutes('./api'),
	views: importRoutes('./views')
};
// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'user_friends'] }));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/main', failureRedirect: '/' }));
	app.all('/logout', function(req, res){ req.logout(); res.redirect('/'); });
	app.all('/main', routes.views.main);
	app.all('/contact', routes.views.contact);
	app.all('/api/debtsCredits', routes.api.debtsCredits);
	app.all('/api/debtsSettle', routes.api.settle);
	app.all('/api/debtsSubmit', routes.api.submit);
	
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
};
