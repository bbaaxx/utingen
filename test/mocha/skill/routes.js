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
    Skill = mongoose.model('Skill');

//Globals
var skill;

// Factories
require('../../factories/api/skill.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Routes for Skill controller:', function() {


        describe('Route "/skills"', function() {

            describe('Method: GET',function(){
                it('Should be 200 and return \'application/json\' content', function(done) {
                    request(server).
                        get('/skills').
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200, done);
                });
            });

            describe('Method: POST',function(){

                it('Should be 200 and return \'application/json\' content', function(done) {
                    request(server).
                        post('/skills').
                        send( chai.create('skill') ).
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200, done);
                });

                it('Should be 200 and return a JSON error if no data comes '+
                    'in the request', function(done) {
                    request(server).
                        post('/skills').
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

        describe('Route "/skill/:languageId"', function(){
            before(function(done){
                skill = new Skill( chai.create('skill') );
                done();
            });
            beforeEach(function(done) {
                skill.save(done);
            });

            describe('Method: GET', function(){

                it('Should be 200 and return \'application/json\' content', function(done){
                    request(server).
                        get('/skills/'+skill._id).
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
                    var _skill = chai.create('skill');
                    _skill.name = 'Other Name';
                    request(server).
                        put('/skills/'+skill._id).
                        set('Accept', 'application/json').
                        send(_skill).
                        expect('Content-Type', /json/).
                        expect(200,done);
                });

            });

            describe('Method: DELETE', function(){

                it('Should be 200 and return \'application/json\' content', function(done){
                    request(server).
                        del('/skills/'+skill._id).
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200,done);
                });

            });

            afterEach(function(done) {
                Skill.remove({});
                done();
            });
            after(function(done) {
                Skill.remove().exec();
                done();
            });
        });


    });
});