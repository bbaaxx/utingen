'use strict';

/**
 * Module dependencies.
 */
var factories = require('chai-factories');

module.exports = function(chai){
    chai.use(factories);

    chai.factory('language',

        {
            iso639_2A3_b: 'spa',
            iso639_2A3_t: '',
            iso639_1A2: 'es',
            name: 'Spanish'
        }

    );

};
