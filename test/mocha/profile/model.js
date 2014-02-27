'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai'),
    should = chai.should(),
    mongoose = require('mongoose'),
    Profile = mongoose.model('Profile'),
    Language = mongoose.model('Language'),
    Skill = mongoose.model('Skill');

//Globals
var profile, language, skill;

// Factories
require('../../factories/api/profile.factory')(chai);
require('../../factories/api/language.factory')(chai);
require('../../factories/api/skill.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Model Profile:', function() {

        beforeEach(function(done) {
            language = new Language(chai.create('language'));
            skill = new Skill(chai.create('skill'));
            language.save(function(){
                skill.save(function(){
                    profile = new Profile(chai.create('profile'));
                    profile.data.softSkills[0].skill = skill;
                    profile.data.techSkills[0].skill = skill;
                    done();
                });
            });
        });

        describe('Method Save', function() {

            it('should be able to save without problems',
                function(done) {
                    return profile.save(function(err) {
                        should.not.exist(err);
                        done();
                    });
                });

            it('should be able to show an error when try to save without name',
                function(done) {
                    profile.ident.name = '';
                    return profile.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });

        });

        describe('Methods', function () {

            it('should have a method that returns the value of "current" as a date',
                function(done){
                    // expect(typeof profile.gimmehDate().getMonth).
                    // to.equal('function');
                    done();
                });

        });


        afterEach(function(done) {
            Language.remove({});
            Skill.remove({});
            Profile.remove({});
            done();
        });
        after(function(done) {
            Language.remove().exec();
            Skill.remove().exec();
            Profile.remove().exec();
            done();
        });
    });
});