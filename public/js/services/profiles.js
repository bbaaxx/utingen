'use strict';

//Profiles service used for profiles REST endpoint
angular.module('utingen.profiles')
    .factory('Profiles', ['$resource', function($resource) {

        return $resource('profiles/:profileId', {
            profileId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });

    }]);