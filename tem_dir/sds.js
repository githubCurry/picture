'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	User = require('mongoose').model('User'),
	path = require('path'),
	config = require('./config');
var GithubStrategy = require('passport-github').Strategy;
/**
 * Module init function.
 */



module.exports = function() {
	// Serialize sessions


	passport.serializeUser(function(user, done) {
		console.log(user)
		done(null, user.id);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
		console.log(id)
		done(null, id);

	});


	passport.use(new GithubStrategy({
			clientID: '9956dcf940041a479ae9',
			clientSecret: '1b187f5e301c694218ce50e0c2e98fe37c0bf76a',
			callbackURL: '/auth/github/callback'
		},
		function(req, accessToken, refreshToken, profile, done) {
			done(null, profile);
		}
	));

};
