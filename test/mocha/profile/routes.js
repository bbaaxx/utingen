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
    Language = mongoose.model('Language');

//Globals
var language;

// Factories
require('../../factories/api/language.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Routes for Language controller:', function() {


        describe('Route "/languages"', function() {

            describe('Method: GET',function(){
                it('Should be 200 and return \'application/json\' content', function(done) {
                    request(server).
                        get('/languages').
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200, done);
                });
            });

            describe('Method: POST',function(){

                it('Should be 200 and return \'application/json\' content', function(done) {
                    request(server).
                        post('/languages').
                        send( chai.create('language') ).
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200, done);
                });

                it('Should be 200 and return a JSON error if no data comes '+
                    'in the request', function(done) {
                    request(server).
                        post('/languages').
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

        describe('Route "/language/:languageId"', function(){
            before(function(done){
                language = new Language( chai.create('language') );
                done();
            });
            beforeEach(function(done) {
                language.save(done);
            });

            describe('Method: GET', function(){

                it('Should be 200 and return \'application/json\' content', function(done){
                    request(server).
                        get('/languages/'+language._id).
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
                    var _language = chai.create('language');
                    _language.name = 'Nahuatl';
                    request(server).
                        put('/languages/'+language._id).
                        set('Accept', 'application/json').
                        send(_language).
                        expect('Content-Type', /json/).
                        expect(200,done);
                });

            });

            describe('Method: DELETE', function(){

                it('Should be 200 and return \'application/json\' content', function(done){
                    request(server).
                        del('/languages/'+language._id).
                        set('Accept', 'application/json').
                        expect('Content-Type', /json/).
                        expect(200,done);
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
});