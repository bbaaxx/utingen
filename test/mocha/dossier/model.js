'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai'),
    should = chai.should(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Dossier = mongoose.model('Dossier');

//Globals
var user;
var dossier;

// Factories
require('../../factories/api/user.factory')(chai);
require('../../factories/api/dossier.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Model Dossier:', function() {
        beforeEach(function(done) {
            user = new User(chai.create('user'));
            user.save(function() {
                dossier = new Dossier( chai.create('dossier') );
                dossier.user = user;
                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return dossier.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                dossier.title = '';

                return dossier.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            Dossier.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            Dossier.remove().exec();
            User.remove().exec();
            done();
        });
    });
});