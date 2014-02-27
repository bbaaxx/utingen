'use strict';

/**
 * Module dependencies.
 */
var factories = require('chai-factories');

/**
 * Module dependencies.
 */

module.exports = function(chai){
    chai.use(factories);

    chai.factory('profile',
        {
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
                        proficencies: [{
                            dimension: 'test dimension',
                            value: 50
                        }]
                    }
                ],
                softSkills: [
                    {
                        proficencies: [{
                            dimension: 'test dimension',
                            value: 20
                        }]
                    }
                ],
            }
        }
    );

};
