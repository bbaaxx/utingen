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
    Profile = mongoose.model('Profile');

//Globals
var profile;

// Factories
require('../../factories/api/profile.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Routes for Profile controller:', function() {


        describe('Route "/profiles"', function() {

            describe('Method: GET',function(){
                it('Should be 200 and return \'application/json\' content', function(done) {
                    request(server).
                        get('/profiles').
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200, done);
                });
            });

            describe('Method: POST',function(){

                it('Should be 200 and return \'application/json\' content', function(done) {
                    request(server).
                        post('/profiles').
                        send( chai.create('profile') ).
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200, done);
                });

                it('Should be 200 and return a JSON error if no data comes '+
                    'in the request', function(done) {
                    request(server).
                        post('/profiles').
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

        describe('Route "/profile/:profileId"', function(){
            before(function(done){
                profile = new Profile( chai.create('profile') );
                done();
            });
            beforeEach(function(done) {
                profile.save(done);
            });

            describe('Method: GET', function(){

                it('Should be 200 and return \'application/json\' content', function(done){
                    request(server).
                        get('/profiles/'+profile._id).
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
                    var _profile = chai.create('profile');
                    _profile.name = 'Nahuatl';
                    request(server).
                        put('/profiles/'+profile._id).
                        set('Accept', 'application/json').
                        send(_profile).
                        expect('Content-Type', /json/).
                        expect(200,done);
                });

            });

            describe('Method: DELETE', function(){

                it('Should be 200 and return \'application/json\' content', function(done){
                    request(server).
                        del('/profiles/'+profile._id).
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200,done);
                });

            });

            afterEach(function(done) {
                Profile.remove({});
                done();
            });
            after(function(done) {
                Profile.remove().exec();
                done();
            });
        });


    });
});