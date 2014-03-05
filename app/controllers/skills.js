'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Skill = mongoose.model('Skill'),
    _ = require('lodash');


/**
 * Find skill by id
 */
exports.skill = function(req, res, next, id) {
    Skill.load(id, function(err, skill) {
        if (err) return next(err);
        if (!skill) return next(new Error('Failed to load skill ' + id));
        req.skill = skill;
        next();
    });
};

/**
 * Create a skill
 */
exports.create = function(req, res) {
    var skill = new Skill(req.body);
    // skill.user = req.user;
    skill.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                skill: skill
            });
        } else {
            res.jsonp(skill);
        }
    });
};

/**
 * Update a skill
 */
exports.update = function(req, res) {
    var skill = req.skill;

    skill = _.extend(skill, req.body);

    skill.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                skill: skill
            });
        } else {
            res.jsonp(skill);
        }
    });
};

/**
 * Delete a skill
 */
exports.destroy = function(req, res) {
    var skill = req.skill;

    skill.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                skill: skill
            });
        } else {
            res.jsonp(skill);
        }
    });
};

/**
 * Show a skill
 */
exports.show = function(req, res) {
    res.jsonp(req.skill);
};

/**
 * List of Languages
 */
exports.all = function(req, res) {
    Skill.
        find().
        //sort('-created').
        //populate('user', 'name username').
        exec(function(err, skills) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(skills);
            }
        });
};
