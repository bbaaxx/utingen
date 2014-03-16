'use strict';

angular.
    module('utingen.skills').
    controller('SkillsController',
        ['$scope', '$stateParams', '$location', 'Global', 'Skills', 'SkillsIs',
        function ($scope, $stateParams, $location, Global, Skills, SkillsIs) {

    $scope.global = Global;

    $scope.create = function() {
        var skill = new Skills({
            name: this.name,
            related: this.related || null,
            dimensions: this.dimensions
        });
        skill.$save(function(response) {
            $location.path('skills/' + response._id);
        });

        this.name = '';
        this.related = '';
        this.dimensions = [];
    };

    $scope.remove = function(skill) {
        if (skill) {
            skill.$remove();

            for (var i in $scope.skills) {
                if ($scope.skills[i] === skill) {
                    $scope.skills.splice(i, 1);
                }
            }
        }
        else {
            $scope.skill.$remove();
            $location.path('skills');
        }
    };

    $scope.update = function() {
        var skill = $scope.skill;
        if (!skill.updated) {
            skill.updated = [];
        }
        skill.updated.push(new Date().getTime());

        skill.$update(function() {
            $location.path('skills/' + skill._id);
        });
    };

    $scope.find = function() {
        Skills.query(function(skills) {
            $scope.skills = skills;
        });
    };

    $scope.findOne = function() {
        Skills.get({
            skillId: $stateParams.skillId
        }, function(skill) {
            $scope.skill = skill;
        });
    };

    $scope.isResults = [];
    $scope.instaSearch = function() {
        if ($scope.related && $scope.related.toString().length > 1) {
            SkillsIs.query({
                isQry: $scope.related
            }, function(result){
                $scope.isResults = result;
            });
        }
    };
    $scope.dimensions = [];
    $scope.addDimension = function() {
        $scope.dimensions.push({
            name: this.newdName,
            description: this.newdDescription,
            scale: this.newdScale
        });
        this.newdName = '';
        this.newdDescription = '';
        this.newdScale = '';
    };
}]);
