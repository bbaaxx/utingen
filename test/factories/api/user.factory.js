'use strict';

/**
 * Module dependencies.
 */
var factories = require('chai-factories');

module.exports = function(chai){
    chai.use(factories);

    chai.factory('user',

        {
            name: 'TestUser Full Name',
            email: 'test@test.com',
            username: 'user',
            password: 'password'
        }

    );

};
