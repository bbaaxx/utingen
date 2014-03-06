/**
 * TO-DO:
 *      - Review the 'mutProp' assignment to consider cases where there are no
 *        string properties on the model.
 *      - Improve error condition test of 'destroy' method.
 *      - Test for error condition of the 'all' method.
 */

'use strict';
/* jshint -W079 */
/* jshint expr:true */

/**
 * Module dependencies.
 */
var chai = require('chai'),
    expect = chai.expect,
    mongoose = require('mongoose'),
    Language = mongoose.model('Language'),
    controller = require( process.cwd() + '/app/controllers/languages');

//Globals
var language, req = {}, res = {}, mutProp;

// Factories
require('../../factories/api/language.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Controller Languages:', function() {
        before(function(done){
            for (var _key in Language.schema.paths){
                if (Language.schema.paths[_key].path !== '_id' &&
                    Language.schema.paths[_key].path !== '__v' &&
                    Language.schema.paths[_key].instance === 'String' &&
                    Language.schema.paths[_key].validators.length > 0) {

                    mutProp = _key;
                }
            }
            done();
        });


        describe('Method language', function() {
            beforeEach(function(done) {
                language = new Language( chai.create('language') );
                language.save(done);
            });

            it('Should return an \'application/json\' object with '+
                'the requested language document', function(done){
                    controller.language(req,res,function(err){
                        expect(err).to.not.exist;
                        expect(req.language._id).
                            to.be.an.instanceOf(mongoose.Types.ObjectId);
                        expect(req.language.__v).to.exist;
                        done();
                    },language._id);
                });
            it('Should return an error if the requested document is not found',
                function(done){
                    controller.language(req,res,function(err){
                        expect(err).to.exist;
                        done();
                    }, mongoose.Types.ObjectId());
                });
            it('Should return an error if the parameter is not a document id',
                function(done){
                    controller.language(req,res,function(err){
                        expect(err).to.exist;
                        done();
                    }, 'dudelydoo');
                });
        });

        describe('Method create', function() {
            it('Should store and return a jsonp representation '+
                ' of the document', function(done) {
                    req.body = chai.create('language');
                    res = {
                        jsonp: function(_language) {
                            expect(_language.__v).to.exist;
                            done();
                        },
                        send: function(_redir,_errObj) {
                            expect(_errObj).to.not.exist;
                            done();
                        }
                    };
                    controller.create(req,res);
                });
            it('Should set a redirect and return an error object '+
                'if request body is empty', function(done) {
                    req.body = {};
                    res = {
                        jsonp: function(_language) {
                            expect(_language.__v).to.not.exist;
                            done();
                        },
                        send: function(_redir,_errObj) {
                            expect(_redir).to.be.a('string');
                            expect(_errObj).to.exist;
                            done();
                        }
                    };
                    controller.create(req,res);
                });
        });

        describe('Method update', function() {
            beforeEach(function(done) {
                language = new Language( chai.create('language') );
                language.save(done);
            });

            it('Should update and return a jsonp representation '+
                ' of the document', function(done) {
                    req.language = language;
                    req.body = {};
                    req.body[mutProp] = 'utingen_testing_happens';

                    res = {
                        jsonp: function(_language) {
                            expect(_language._id).to.equal(language._id);
                            expect(_language[mutProp]).to.equal('utingen_testing_happens');
                            done();
                        },
                        send: function(_redir,_errObj) {
                            expect(_errObj).to.not.exist;
                            done();
                        }
                    };
                    controller.update(req,res);
                });
            it('Should set a redirect and return an error object '+
                'if request parameters are not valid', function(done) {
                    req.language = language;
                    req.body = {};
                    req.body[mutProp] = '';

                    res = {
                        jsonp: function(_language) {
                            expect(_language.__v).to.not.exist;
                            done();
                        },
                        send: function(_redir,_errObj) {
                            expect(_redir).to.be.a('string');
                            expect(_errObj).to.exist;
                            done();
                        }
                    };
                    controller.update(req,res);
                });
        });

        describe('Method destroy', function() {
            beforeEach(function(done) {
                language = new Language( chai.create('language') );
                language.save(done);
            });

            it('Should remove the document and return a jsonp representation '+
                ' of the document', function(done) {
                    req.language = language;
                    res = {
                        jsonp: function(_language) {
                            expect(_language._id).to.equal(language._id);
                            done();
                        },
                        send: function(_redir,_errObj) {
                            expect(_errObj).to.not.exist;
                            done();
                        }
                    };
                    controller.destroy(req,res);
                });
            it('Should test the fail condition of the destroy method ');
        });

        describe('Method show', function() {
            beforeEach(function(done) {
                language = new Language( chai.create('language') );
                language.save(done);
            });

            it('Should return a jsonp representation '+
                ' of the requested document', function(done) {
                    req.language = language;
                    res = {
                        jsonp: function(_language) {
                            expect(_language._id).to.equal(language._id);
                            done();
                        },
                        send: function(_redir,_errObj) {
                            expect(_errObj).to.not.exist;
                            done();
                        }
                    };
                    controller.show(req,res);
                });
        });

        describe('Method all', function() {
            beforeEach(function(done) {
                language = new Language( chai.create('language') );
                language.save(done);
            });

            it('Should return a jsonp representation '+
                ' of all the documents in the collection', function(done) {
                    res = {
                        jsonp: function(_language) {
                            // console.log(_language);
                            expect(_language).to.be.an('Array');
                            done();
                        },
                        send: function(_redir,_errObj) {
                            expect(_errObj).to.not.exist;
                            done();
                        }
                    };
                    controller.all(req,res);
                });
        });


        afterEach(function(done) {
            Language.remove({}, function(){
                language = {};
                req = {};
                res = {};
                done();
            });
        });
    });
});