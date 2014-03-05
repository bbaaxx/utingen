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
 * Skill Schema
 */
var SkillSchema = new Schema({
    name: {
        type: String,
        trim: true,
        default: ''
    },
    related: [{
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    dimensions: [{
        name: {
            type: String,
            trim: true,
            default: ''
        },
        description:{
            type: String,
            trim: true,
            default: ''
        },
        scale: {
            type: Number,
            default: 0
        }
    }]
});

/**
 * Validations
 */
SkillSchema.path('name').validate(function(name) {
    return name.length;
}, 'Property [name]  cannot be blank');

/**
 * Statics
 */
SkillSchema.statics.load = function(id, cb) {
    this.findOne({ _id: id }).
        //populate('user', 'name username').
        exec(cb);
};

mongoose.model('Skill', SkillSchema);
