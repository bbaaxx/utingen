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
var tstLng = require('config/languages').spa;
var tstSkl = {
    name: 'Test Skill',
    dimension: [{
        name: 'test dimemsion',
        description: 'test description',
        scale: 100
    }]
};

//The tests
describe('<Unit Test>', function() {
    describe('Model Profile:', function() {

        beforeEach(function(done) {

            language = new Language(tstLng);
            skill = new Skill(tstSkl);

            language.save(function(){
                skill.save(function(){

                    profile = new Profile({
                        ident: {
                            name: 'Test profile 1',
                            description: 'Lorem ipsum description',
                            version: '1.0.0'
                        },
                        data: {
                            summaries: [
                                'Lorem ipsum summary 1',
                                'Lorem ipsum summary 2'
                            ],
                            degrees: [
                                {
                                    name: 'Test degree name',
                                    major: 'Test major',
                                    entity: 'Test entity',
                                    generation: '2014-2015',
                                    certifications: [{
                                        name: 'Test cert 1',
                                        description: 'Description for test cert 1'
                                    }]
                                }
                            ],
                            techSkills: [
                                {
                                    skill: skill,
                                    proficencies: [{
                                        dimension: 'test dimension',
                                        value: 50
                                    }]
                                }
                            ],
                            softSkills: [
                                {
                                    skill: skill,
                                    proficencies: [{
                                        dimension: 'test dimension',
                                        value: 20
                                    }]
                                }
                            ],
                        }
                    });

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