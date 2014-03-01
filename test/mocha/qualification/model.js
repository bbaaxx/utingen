'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai'),
    should = chai.should(),
    mongoose = require('mongoose'),
    Qualification = mongoose.model('Qualification');

//Globals
var qualification;

// Factories
require('../../factories/api/qualification.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Model Qualification:', function() {
        beforeEach(function(done) {
            qualification = new Qualification( chai.create('qualification') );
            done();
        });

        describe('Method Save', function() {

            it('should be able to save without problems', function(done) {
                return qualification.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without a '+
                'name', function(done) {
                    qualification.name = '';

                    return qualification.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
        });

        afterEach(function(done) {
            Qualification.remove({});
            done();
        });
        after(function(done) {
            Qualification.remove().exec();
            done();
        });
    });
});