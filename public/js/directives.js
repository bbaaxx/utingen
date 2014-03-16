'use strict';

angular.module('utingen.profiles').
    directive('utnSkills', function(){
        return {
            template : 'Name: {{skill.name}} Related Skills: {{skill.related}}'
        };
    });
