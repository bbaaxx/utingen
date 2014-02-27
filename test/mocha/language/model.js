'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai'),
    should = chai.should(),
    mongoose = require('mongoose'),
    Language = mongoose.model('Language');

//Globals
var language;

// Factories
require('../../factories/api/language.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Model Language:', function() {
        beforeEach(function(done) {
            language = new Language( chai.create('language') );
            done();
        });

        describe('Method Save', function() {

            it('should be able to save without problems', function(done) {
                return language.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should show an error when trying to save without a '+
                'ISO639_2A_3b value', function(done) {
                    language.iso639_2A3_b = '';

                    return language.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });

            it('should show an error when try to save without a '+
                'name', function(done) {
                    language.name = '';

                    return language.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
        });

        afterEach(function(done) {
            Language.remove({});
            done();
        });
        after(function(done) {
            Language.remove().exec();
            done();
        });
    });
});