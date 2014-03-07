'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Dossier = mongoose.model('Dossier'),
    _ = require('lodash');


/**
 * Find dossier by id
 */
exports.dossier = function(req, res, next, id) {
    Dossier.load(id, function(err, dossier) {
        if (err) return next(err);
        if (!dossier) return next(new Error('Failed to load dossier ' + id));
        req.dossier = dossier;
        next();
    });
};

/**
 * Create an dossier
 */
exports.create = function(req, res) {
    var dossier = new Dossier(req.body);
    dossier.user = req.user;

    dossier.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                dossier: dossier
            });
        } else {
            res.jsonp(dossier);
        }
    });
};

/**
 * Update an dossier
 */
exports.update = function(req, res) {
    var dossier = req.dossier;

    dossier = _.extend(dossier, req.body);

    dossier.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                dossier: dossier
            });
        } else {
            res.jsonp(dossier);
        }
    });
};

/**
 * Delete an dossier
 */
exports.destroy = function(req, res) {
    var dossier = req.dossier;

    dossier.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                dossier: dossier
            });
        } else {
            res.jsonp(dossier);
        }
    });
};

/**
 * Show an dossier
 */
exports.show = function(req, res) {
    res.jsonp(req.dossier);
};

/**
 * List of Dossiers
 */
exports.all = function(req, res) {
    Dossier.find().sort('-created').populate('user', 'name username').exec(function(err, dossiers) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(dossiers);
        }
    });
};
