'use strict';

/**
 * Module dependencies.
 */
var factories = require('chai-factories');

module.exports = function(chai){
    chai.use(factories);

    chai.factory('position',

        {
            name: 'Test position',
            description: 'Description for test position',
            activities: ['Test activity 1', 'Test activity 2'],
            tools: ['Test tool 1','Test tool 2']
        }

    );

};