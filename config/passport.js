'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    User = require('mongoose').model('User'),
    path = require('path'),
    fs = require("fs"),
    config = require('./config');

module.exports = function() {
    // Serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize sessions
    passport.deserializeUser(function(id, done) {
        done(null, id);

    });
    fs.readdirSync("./config/strategies").forEach(function(file, index) {
        require("./strategies/" + file)();
    });

};
