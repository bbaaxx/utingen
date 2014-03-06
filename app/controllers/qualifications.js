'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Qualification = mongoose.model('Qualification'),
    _ = require('lodash');


/**
 * Find qualification by id
 */
exports.qualification = function(req, res, next, id) {
    Qualification.load(id, function(err, qualification) {
        if (err) return next(err);
        if (!qualification) return next(new Error('Failed to load qualification ' + id));
        req.qualification = qualification;
        next();
    });
};

/**
 * Create a qualification
 */
exports.create = function(req, res) {
    var qualification = new Qualification(req.body);
    // qualification.user = req.user;
    qualification.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                qualification: qualification
            });
        } else {
            res.jsonp(qualification);
        }
    });
};

/**
 * Update a qualification
 */
exports.update = function(req, res) {
    var qualification = req.qualification;
    qualification = _.extend(qualification, req.body);

    qualification.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                qualification: qualification
            });
        } else {
            res.jsonp(qualification);
        }
    });
};

/**
 * Delete a qualification
 */
exports.destroy = function(req, res) {
    var qualification = req.qualification;

    qualification.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                qualification: qualification
            });
        } else {
            res.jsonp(qualification);
        }
    });
};

/**
 * Show a qualification
 */
exports.show = function(req, res) {
    res.jsonp(req.qualification);
};

/**
 * List of Qualifications
 */
exports.all = function(req, res) {
    Qualification.
        find().
        sort('-name').
        //populate('user', 'name username').
        exec(function(err, qualifications) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(qualifications);
            }
        });
};
