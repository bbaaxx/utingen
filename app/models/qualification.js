/**
 * TO-DO:
 *      - promotedBy: { <user> } field to be implemented along with ua
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Qualification Schema
 */
var QualificationSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    major: {
        type: String,
        default: '',
        trim: true
    },
    entity: {
        type: String,
        default: '',
        trim: true
    },
    generation: {
        type: String,
        default: '',
        trim: true
    },
    credentials: [{
        name: {
            type: String,
            default: '',
            trim: true
        },
        description: {
            type: String,
            default: '',
            trim: true
        }
    }]
});

/**
 * Validations
 */
QualificationSchema.path('name').validate(function(name) {
    return name.length;
}, 'Property [name]  cannot be blank');

QualificationSchema.path('major').validate(function(major) {
    return major.length;
}, 'Property [major]  cannot be blank');

/**
 * Statics
 */
QualificationSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Qualification', QualificationSchema);