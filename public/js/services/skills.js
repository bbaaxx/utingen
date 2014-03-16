'use strict';

//Skills service used for skills REST endpoint.
angular.module('utingen.skills')

    .factory('Skills', ['$resource', function($resource){
        return $resource('skills/:skillId', {
            skillId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });

    }])
    .factory('SkillsIs', ['$resource', function($resource){
        return $resource('skills/is/:isQry', {
            isQry: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });

    }]);
