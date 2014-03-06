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
    Position = mongoose.model('Position'),
    controller = require( process.cwd() + '/app/controllers/positions');

//Globals
var position, req = {}, res = {}, mutProp;

// Factories
require('../../factories/api/position.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Controller Positions:', function() {
        before(function(done){
            for (var _key in Position.schema.paths){
                if (Position.schema.paths[_key].path !== '_id' &&
                    Position.schema.paths[_key].path !== '__v' &&
                    Position.schema.paths[_key].instance === 'String' &&
                    Position.schema.paths[_key].validators.length > 0) {

                    mutProp = _key;
                }
            }
            done();
        });


        describe('Method position', function() {
            beforeEach(function(done) {
                position = new Position( chai.create('position') );
                position.save(done);
            });

            it('Should return an \'application/json\' object with '+
                'the requested position document', function(done){
                    controller.position(req,res,function(err){
                        expect(err).to.not.exist;
                        expect(req.position._id).
                            to.be.an.instanceOf(mongoose.Types.ObjectId);
                        expect(req.position.__v).to.exist;
                        done();
                    },position._id);
                });
            it('Should return an error if the requested document is not found',
                function(done){
                    controller.position(req,res,function(err){
                        expect(err).to.exist;
                        done();
                    }, mongoose.Types.ObjectId());
                });
            it('Should return an error if the parameter is not a document id',
                function(done){
                    controller.position(req,res,function(err){
                        expect(err).to.exist;
                        done();
                    }, 'dudelydoo');
                });
        });

        describe('Method create', function() {
            it('Should store and return a jsonp representation '+
                ' of the document', function(done) {
                    req.body = chai.create('position');
                    res = {
                        jsonp: function(_position) {
                            expect(_position.__v).to.exist;
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
                        jsonp: function(_position) {
                            expect(_position.__v).to.not.exist;
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
                position = new Position( chai.create('position') );
                position.save(done);
            });

            it('Should update and return a jsonp representation '+
                ' of the document', function(done) {
                    req.position = position;
                    req.body = {};
                    req.body[mutProp] = 'utingen_testing_happens';

                    res = {
                        jsonp: function(_position) {
                            expect(_position._id).to.equal(position._id);
                            expect(_position[mutProp]).to.equal('utingen_testing_happens');
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
                    req.position = position;
                    req.body = {};
                    req.body[mutProp] = '';

                    res = {
                        jsonp: function(_position) {
                            expect(_position.__v).to.not.exist;
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
                position = new Position( chai.create('position') );
                position.save(done);
            });

            it('Should remove the document and return a jsonp representation '+
                ' of the document', function(done) {
                    req.position = position;
                    res = {
                        jsonp: function(_position) {
                            expect(_position._id).to.equal(position._id);
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
                position = new Position( chai.create('position') );
                position.save(done);
            });

            it('Should return a jsonp representation '+
                ' of the requested document', function(done) {
                    req.position = position;
                    res = {
                        jsonp: function(_position) {
                            expect(_position._id).to.equal(position._id);
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
                position = new Position( chai.create('position') );
                position.save(done);
            });

            it('Should return a jsonp representation '+
                ' of all the documents in the collection', function(done) {
                    res = {
                        jsonp: function(_position) {
                            // console.log(_position);
                            expect(_position).to.be.an('Array');
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
            Position.remove({}, function(){
                position = {};
                req = {};
                res = {};
                done();
            });
        });
    });
});