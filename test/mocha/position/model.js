'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai'),
    should = chai.should(),
    mongoose = require('mongoose'),
    Position = mongoose.model('Position');

//Globals
var position;

// Factories
require('../../factories/api/position.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Model Position:', function() {
        beforeEach(function(done) {
            position = new Position( chai.create('position') );
            done();
        });

        describe('Method Save', function() {

            it('should be able to save without problems', function(done) {
                return position.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without a '+
                'name', function(done) {
                    position.name = '';

                    return position.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
        });

        afterEach(function(done) {
            Position.remove({});
            done();
        });
        after(function(done) {
            Position.remove().exec();
            done();
        });
    });
});