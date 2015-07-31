'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    WechatStrategy = require('passport-wechat').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users.server.controller');

module.exports = function() {
    passport.use(new WechatStrategy({
            appid: 'wx3af1ba5b6113419d',
            appsecret: '74c7bf3702ff7d2cbc554ce19248a4b7',
            callbackURL: 'http://127.0.0.1:3000/auth/wechat/callback'
        },
        function(openid, profile, token, done) {
            console.error('error');
            return done(null, openid, profile);
        }
    ));
};
