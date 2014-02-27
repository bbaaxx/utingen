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
    ident: {
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
        }
    },
    data: {
        summaries:  [{
            type: String,
            default: '',
            trim: true
        }],
        techSkills: [{
            skill: {
                type: Schema.ObjectId,
                ref: 'Skill'
            },
            proficencies: [{
                dimension: {type: String, trim: true},
                value: {type: Number, default: 0}
            }]
        }],
        softSkills:  [{
            skill: {
                type: Schema.ObjectId,
                ref: 'Skill'
            },
            proficencies: [{
                dimension: {type: String, trim: true},
                value: {type: Number, default: 0}
            }]
        }],
        degrees: [{
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
            certifications: [{
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
        }],
        languages: [{
            lang: {
                type: Schema.Types.ObjectId,
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
ProfileSchema.path('ident.name').validate(function(name) {
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
