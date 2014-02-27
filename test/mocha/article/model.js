'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai'),
    should = chai.should(),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Article = mongoose.model('Article');

//Globals
var user;
var article;

// Factories
require('../../factories/api/user.factory')(chai);
require('../../factories/api/article.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Model Article:', function() {
        beforeEach(function(done) {
            user = new User(chai.create('user'));
            user.save(function() {
                article = new Article( chai.create('article') );
                article.user = user;
                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return article.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without title', function(done) {
                article.title = '';

                return article.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            Article.remove({});
            User.remove({});
            done();
        });
        after(function(done) {
            Article.remove().exec();
            User.remove().exec();
            done();
        });
    });
});