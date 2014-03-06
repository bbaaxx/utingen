'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Position = mongoose.model('Position'),
    _ = require('lodash');


/**
 * Find position by id
 */
exports.position = function(req, res, next, id) {
    Position.load(id, function(err, position) {
        if (err) return next(err);
        if (!position) return next(new Error('Failed to load position ' + id));
        req.position = position;
        next();
    });
};

/**
 * Create a position
 */
exports.create = function(req, res) {
    var position = new Position(req.body);
    // position.user = req.user;
    position.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                position: position
            });
        } else {
            res.jsonp(position);
        }
    });
};

/**
 * Update a position
 */
exports.update = function(req, res) {
    var position = req.position;
    position = _.extend(position, req.body);

    position.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                position: position
            });
        } else {
            res.jsonp(position);
        }
    });
};

/**
 * Delete a position
 */
exports.destroy = function(req, res) {
    var position = req.position;

    position.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                position: position
            });
        } else {
            res.jsonp(position);
        }
    });
};

/**
 * Show a position
 */
exports.show = function(req, res) {
    res.jsonp(req.position);
};

/**
 * List of Languages
 */
exports.all = function(req, res) {
    Position.
        find().
        sort('-name').
        //populate('user', 'name username').
        exec(function(err, positions) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(positions);
            }
        });
};
