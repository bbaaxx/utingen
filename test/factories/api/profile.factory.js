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
            name: 'Test profile 1',
            description: 'Lorem ipsum description',
            version: '1.0.0',
            data: {
                summaries: [
                    'Lorem ipsum summary 1',
                    'Lorem ipsum summary 2'
                ],
            }
        }

    );

};
