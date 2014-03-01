/**
 * TO-DO:
 *      - !!! Add validation for qualifications
 *      - promotedBy: { <user> } field to be implemented along with ua
 *      - probably move summaries property to its own model
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Profile Schema
 */
var ProfileSchema = new Schema({
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
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    version: {
        type: String,
        trim: true
    },
    data: {
        summaries:  [{
            type: String,
            default: '',
            trim: true
        }],
        techSkills: [{
            type: Schema.ObjectId,
            ref: 'Skill'
        }],
        softSkills:  [{
            type: Schema.ObjectId,
            ref: 'Skill'
        }],
        qualifications: [{
            type: Schema.ObjectId,
            ref: 'Qualification'
        }],
        languages: [{
            lang: {
                type: Schema.ObjectId,
                ref: 'Language'
            },
            proficencies: [{
                dimension: {type: String, trim: true},
                value: {type: Number, default: 0}
            }]
        }]
    },
    versions: [{type: Object}]
});

/**
 * Methods
 */
// ProfileSchema.methods.gimmehDate = function () {
//     return this.created;
// };

/**
 * Validations
 */
ProfileSchema.path('name').validate(function(name) {
    return name.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
// ProfileSchema.statics.load = function(id, cb) {
//     this.findOne({
//         _id: id
//     }).populate('user', 'name username').exec(cb);
// };

mongoose.model('Profile', ProfileSchema);
