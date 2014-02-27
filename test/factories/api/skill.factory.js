'use strict';

/**
 * Module dependencies.
 */
var factories = require('chai-factories');

module.exports = function(chai){
    chai.use(factories);

    chai.factory('skill',

        {
            name: 'Test Skill',
            dimension: [{
                name: 'test dimemsion',
                description: 'test description',
                scale: 100
            }]
        }

    );

};
