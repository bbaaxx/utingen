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

    chai.factory('article',
        {
            title: 'Article Title',
            content: 'Article Content'
        }
    );

};
