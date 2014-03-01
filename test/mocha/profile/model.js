'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai'),
    should = chai.should(),
    mongoose = require('mongoose'),
    Profile = mongoose.model('Profile'),
    Language = mongoose.model('Language'),
    Skill = mongoose.model('Skill'),
    Qualification = mongoose.model('Qualification');

//Globals
var profile, language, softSkill, techSkill, qualification;

// Factories
require('../../factories/api/profile.factory')(chai);
require('../../factories/api/language.factory')(chai);
require('../../factories/api/skill.factory')(chai);
require('../../factories/api/qualification.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Model Profile:', function() {

        beforeEach(function(done) {

            profile         = new Profile(chai.create('profile'));
            language        = new Language(chai.create('language'));
            softSkill       = new Skill(chai.create('skill'));
            techSkill       = new Skill(chai.create('skill'));
            qualification   = new Qualification(chai.create('qualification'));

            language.save(function(){
                profile.data.languages = [ language ];
                softSkill.save(function(){
                    profile.data.softSkills = [ softSkill ];
                    techSkill.save(function(){
                        profile.data.techSkills = [ techSkill ] ;
                        qualification.save(function(){
                            profile.data.qualifications = [ qualification ];
                            done();
                        });
                    });
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
                    profile.name = '';
                    return profile.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });

        });

        // describe('Methods', function () {

        //     it('should have a method that returns the value of "current" as a date',
        //         function(done){
        //             expect(typeof profile.gimmehDate().getMonth).
        //             to.equal('function');
        //             done();
        //         });

        // });

        afterEach(function(done) {
            Language.remove({});
            Skill.remove({});
            Profile.remove({});
            Qualification.remove({});
            done();
        });
        after(function(done) {
            Language.remove().exec();
            Skill.remove().exec();
            Profile.remove().exec();
            Qualification.remove().exec();
            done();
        });

    });
});