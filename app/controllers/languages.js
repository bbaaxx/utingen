'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Language = mongoose.model('Language'),
    _ = require('lodash');


/**
 * Find language by id
 */
exports.language = function(req, res, next, id) {
    Language.load(id, function(err, language) {
        if (err) return next(err);
        if (!language) return next(new Error('Failed to load language ' + id));
        req.language = language;
        next();
    });
};

/**
 * Create a language
 */
exports.create = function(req, res) {
    var language = new Language(req.body);
    // language.user = req.user;

    language.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                language: language
            });
        } else {
            res.jsonp(language);
        }
    });
};

/**
 * Update a language
 */
exports.update = function(req, res) {
    var language = req.language;

    language = _.extend(language, req.body);

    language.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                language: language
            });
        } else {
            res.jsonp(language);
        }
    });
};

/**
 * Delete a language
 */
exports.destroy = function(req, res) {
    var language = req.language;

    language.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                language: language
            });
        } else {
            res.jsonp(language);
        }
    });
};

/**
 * Show a language
 */
exports.show = function(req, res) {
    res.jsonp(req.language);
};

/**
 * List of Languages
 */
exports.all = function(req, res) {
    Language.
        find().
        sort('-created').
        //populate('user', 'name username').
        exec(function(err, languages) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(languages);
            }
        });
};
