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
    Qualification = mongoose.model('Qualification');

//Globals
var qualification;

// Factories
require('../../factories/api/qualification.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Routes for Qualification controller:', function() {


        describe('Route "/qualifications"', function() {

            describe('Method: GET',function(){
                it('Should be 200 and return \'application/json\' content', function(done) {
                    request(server).
                        get('/qualifications').
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200, done);
                });
            });

            describe('Method: POST',function(){

                it('Should be 200 and return \'application/json\' content', function(done) {
                    request(server).
                        post('/qualifications').
                        send( chai.create('qualification') ).
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200, done);
                });

                it('Should be 200 and return a JSON error if no data comes '+
                    'in the request', function(done) {
                    request(server).
                        post('/qualifications').
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

        describe('Route "/qualification/:qualificationId"', function(){
            before(function(done){
                qualification = new Qualification( chai.create('qualification') );
                done();
            });
            beforeEach(function(done) {
                qualification.save(done);
            });

            describe('Method: GET', function(){

                it('Should be 200 and return \'application/json\' content', function(done){
                    request(server).
                        get('/qualifications/'+qualification._id).
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
                    var _language = chai.create('qualification');
                    _language.name = 'Nahuatl';
                    request(server).
                        put('/qualifications/'+qualification._id).
                        set('Accept', 'application/json').
                        send(_language).
                        expect('Content-Type', /json/).
                        expect(200,done);
                });

            });

            describe('Method: DELETE', function(){

                it('Should be 200 and return \'application/json\' content', function(done){
                    request(server).
                        del('/qualifications/'+qualification._id).
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200,done);
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
});