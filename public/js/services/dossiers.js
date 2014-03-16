'use strict';

//Dossiers service used for dossiers REST endpoint
angular.module('utingen.dossiers')

    .factory('Dossiers', ['$resource', function($resource) {
        return $resource('dossiers/:dossierId', {
            dossierId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });

    }]);