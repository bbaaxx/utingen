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

    chai.factory('dossier',
        {
            title: 'Dossier Title',
            content: 'Dossier Content'
        }
    );

};
