'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai'),
    should = chai.should(),
    request = require('supertest'),
    server = require('server');

//Globals
var language;

// Factories
require('../../factories/api/language.factory')(chai);



//The tests
describe('<Unit Test>', function() {
    describe('Controller Language:', function() {
        before(function(done){
            // Do stuff
            done();
        });
        beforeEach(function(done) {
            // Do something
            done();
        });

        describe('Method Save', function() {

            it('should do stuff', function(done) {
                // Make sure it does stuff
                done();
            });

        });

        afterEach(function(done) {
            // Do stuff
            done();
        });
        after(function(done) {
            // do stuff
            done();
        });
    });
});