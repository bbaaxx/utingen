'use strict';

/**
 * Module dependencies.
 */
var factories = require('chai-factories');

module.exports = function(chai){
    chai.use(factories);

    chai.factory('profile',

        {
            name: 'Test profile',
            description: 'Description for test profile',
            version: '0.0',
            summaries:  [
                'Summary 1 for test profile',
                'Summary 2 for test profile'
            ]
        }

    );

};
