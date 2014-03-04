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

if (server) {
    if (request) {
        if (should) {
            language = 'Dude, I\'m tripping balls';
        }
    }
}

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

            it('should be able to list all language entries', function(done) {

                // request(server).
                //     get('/articles').
                //     set('Accept', 'application/json').
                //     expect('Content-Type', /json/).
                //     expect(200).
                //     end(function(err, res){
                //         if (err) return done(err);
                //         console.log(res.body);
                            done();
                //     });

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