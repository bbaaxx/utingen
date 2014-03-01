'use strict';

/**
 * Module dependencies.
 */
var factories = require('chai-factories');

module.exports = function(chai){
    chai.use(factories);

    chai.factory('qualification',

        {
            name: 'Testing engineer ',
            major: 'Testing',
            entity: 'University of test',
            generation: '2013-2014',
            credentials: [{
                name: 'Credential title test',
                description: 'Credential description test'
            }]
        }

    );

};