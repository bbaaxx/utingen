/**
 * TO-DO:
 *      - promotedBy: { <user> } field to be implemented along with ua
 *      - Improve the model by replacing the data source for languages
 *        to support translation
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Language Schema
 */
var LanguageSchema = new Schema({
    iso639_2A3_b: {
        type: String,
        default: '',
        trim: true
    },
    iso639_2A3_t: {
        type: String,
        trim: true
    },
    iso639_1A2: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */
LanguageSchema.path('iso639_2A3_b').validate(function(value) {
    return value.length;
}, 'Property [iso639_2A3_b] cannot be blank');
LanguageSchema.path('name').validate(function(value) {
    return value.length;
}, 'Property [name]  cannot be blank');

/**
 * Statics
 */
LanguageSchema.statics.load = function(id, cb) {
    this.
        findOne({ _id: id }).
        // populate('user', 'name username').
        exec(cb);
};

mongoose.model('Language', LanguageSchema);
