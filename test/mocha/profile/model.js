'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai'),
    should = chai.should(),
    mongoose = require('mongoose'),
    Profile = mongoose.model('Profile'),
    Skill = mongoose.model('Skill'),
    Language = mongoose.model('Language'),
    Qualification = mongoose.model('Qualification'),
    Position = mongoose.model('Position');

//Globals
var profile, language, softSkill, techSkill, otherSkill, position, qualification;

// Factories
require('../../factories/api/profile.factory')(chai);
require('../../factories/api/skill.factory')(chai);
require('../../factories/api/qualification.factory')(chai);
require('../../factories/api/language.factory')(chai);
require('../../factories/api/position.factory')(chai);

//The tests
describe('<Unit Test>', function() {
    describe('Model Profile:', function() {
        beforeEach(function(done) {
            softSkill       = new Skill         (chai.create('skill'));
            techSkill       = new Skill         (chai.create('skill'));
            otherSkill      = new Skill         (chai.create('skill'));
            qualification   = new Qualification (chai.create('qualification'));
            language        = new Language      (chai.create('language'));
            position        = new Position      (chai.create('position'));
            profile         = new Profile       (chai.create('profile'));
            softSkill.save(function(){
                techSkill.save(function(){
                    otherSkill.save(function() {
                        qualification.save(function(){
                            language.save(function(){
                                position.save(function() {
                                    profile.softSkills      = [ softSkill ];
                                    profile.techSkills      = [ techSkill ];
                                    profile.otherSkills     = [ otherSkill ];
                                    profile.qualifications  = [ qualification ] ;
                                    profile.languages       = [ language ];
                                    profile.position        = [ position ];
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });

        describe('Method Save', function() {

            it('should be able to save without problems', function(done) {
                return profile.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should show an error when try to save without a '+
                'name', function(done) {
                    profile.name = '';
                    return profile.save(function(err) {
                        should.exist(err);
                        done();
                    });
                });
        });

        afterEach(function(done) {
            Skill.remove({});
            Language.remove({});
            Qualification.remove({});
            Position.remove({});
            Profile.remove({});
            done();
        });
        after(function(done) {
            Skill.remove().exec();
            Language.remove().exec();
            Qualification.remove().exec();
            Position.remove().exec();
            Profile.remove().exec();
            done();
        });
    });
});
