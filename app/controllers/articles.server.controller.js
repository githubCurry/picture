'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Article = mongoose.model('Article'),
    _ = require('lodash');
var multiparty = require('multiparty');
var format = require('util').format;
var util = require('util');
   var fs = require('fs');
/**
 * Create a article
 */
exports.create = function(req, res) {
    var article = new Article(req.body);
    article.user = req.user;

    article.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
    res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
    console.error("===========enter get all articles");
    Article.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            console.error(articles);
            res.json(articles);
        }
    });
};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Article is invalid'
        });
    }

    Article.findById(id).populate('user', 'displayName').exec(function(err, article) {
        if (err) return next(err);
        if (!article) {
            return res.status(404).send({
                message: 'Article not found'
            });
        }
        req.article = article;
        next();
    });
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.article.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};


exports.upload = function(req, res, next) {
        var form = new multiparty.Form({
            uploadDir: './public/images'
        });
        //下载后处理
        form.parse(req, function(err, fields, files) {
                    var filesTmp = JSON.stringify(files, null, 2);
                    if (err) {
                        console.log('parse error: ' + err);
                    } else {
                        console.log('parse files: ' + filesTmp);
                        var inputFile = files.image[0];
                        var uploadedPath = inputFile.path;
                        var dstPath = './public/images' + inputFile.originalFilename;
                    }

                    res.writeHead(200, {
                        'content-type': 'text/plain;charset=utf-8'
                    });
                    res.write('received upload:\n\n');
                    res.end(util.inspect({
                        fields: fields,
                        files: filesTmp
                    }));

                })
}