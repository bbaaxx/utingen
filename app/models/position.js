/**
 * TO-DO:
 *      - promotedBy: { <user> } field to be implemented along with ua
 *      - a property to caracterize the position in an org chart
 *      - a property to track quantifiable achievements
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Position Schema
 */
var PositionSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    activities: [{
        type: String,
        default: '',
        trim: true
    }],
    tools: [{
        type: String,
        default: '',
        trim: true
    }]
});

/**
 * Validations
 */
PositionSchema.path('name').validate(function(name) {
    return name.length;
}, 'Property [name]  cannot be blank');

/**
 * Statics
 */
PositionSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Position', PositionSchema);