'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	GithubStrategy = require('passport-github').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');

module.exports = function() {
	console.error('githubgithub');
	passport.use(new GithubStrategy({
			clientID: '9956dcf940041a479ae9',
			clientSecret: '1b187f5e301c694218ce50e0c2e98fe37c0bf76a',
			callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
			passReqToCallback: true
		},
		function(req, accessToken, refreshToken, profile, done) {

			 // done(null, profile);
			// Set the provider data and include tokens
			var providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			// Create the user OAuth profile
			var displayName = profile.displayName.trim();
			var iSpace = displayName.indexOf(' '); // index of the whitespace following the firstName
			var firstName =  iSpace !== -1 ? displayName.substring(0, iSpace) : displayName;
			var lastName = iSpace !== -1 ? displayName.substring(iSpace + 1) : '';

			var providerUserProfile = {
				firstName: firstName,
				lastName: lastName,
				displayName: displayName,
				email: profile.emails[0].value,
				username: profile.username,
				provider: 'github',
				providerIdentifierField: 'id',
				providerData: providerData
			};
			req.session.name=providerUserProfile.displayName;
			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};
