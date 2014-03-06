'use strict';
/* jshint -W079 */
/* jshint expr:true */

/**
 * Module dependencies.
 */
var server = require('server'),
    chai = require('chai'),
    expect = chai.expect,
    request = require('supertest'),
    mongoose = require('mongoose'),
    Position = mongoose.model('Position');

//Globals
var position;

// Factories
require('../../factories/api/position.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Routes for Position controller:', function() {


        describe('Route "/positions"', function() {

            describe('Method: GET',function(){
                it('Should be 200 and return \'application/json\' content', function(done) {
                    request(server).
                        get('/positions').
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200, done);
                });
            });

            describe('Method: POST',function(){

                it('Should be 200 and return \'application/json\' content', function(done) {
                    request(server).
                        post('/positions').
                        send( chai.create('position') ).
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200, done);
                });

                it('Should be 200 and return a JSON error if no data comes '+
                    'in the request', function(done) {
                    request(server).
                        post('/positions').
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200).
                        end(function(err) {
                            expect(err).to.exist;
                            done();
                        });
                });

            });

        });

        describe('Route "/position/:positionId"', function(){
            before(function(done){
                position = new Position( chai.create('position') );
                done();
            });
            beforeEach(function(done) {
                position.save(done);
            });

            describe('Method: GET', function(){

                it('Should be 200 and return \'application/json\' content', function(done){
                    request(server).
                        get('/positions/'+position._id).
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200).
                        end(function(err) {
                            if (err) return done(err);
                            done();
                        });
                });

            });

            describe('Method: PUT', function(){

                it('Should be 200 and return \'application/json\' content', function(done){
                    var _language = chai.create('position');
                    _language.name = 'Nahuatl';
                    request(server).
                        put('/positions/'+position._id).
                        set('Accept', 'application/json').
                        send(_language).
                        expect('Content-Type', /json/).
                        expect(200,done);
                });

            });

            describe('Method: DELETE', function(){

                it('Should be 200 and return \'application/json\' content', function(done){
                    request(server).
                        del('/positions/'+position._id).
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200,done);
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
});