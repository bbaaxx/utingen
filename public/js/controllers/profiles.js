'use strict';

angular.module('utingen.profiles').controller('ProfilesController', ['$scope', '$stateParams', '$location', 'Global', 'Profiles', function ($scope, $stateParams, $location, Global, Profiles) {
    $scope.global = Global;

    $scope.create = function() {
        var profile = new Profiles({
            title: this.title,
            content: this.content
        });
        profile.$save(function(response) {
            $location.path('profiles/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(profile) {
        if (profile) {
            profile.$remove();

            for (var i in $scope.profiles) {
                if ($scope.profiles[i] === profile) {
                    $scope.profiles.splice(i, 1);
                }
            }
        }
        else {
            $scope.profile.$remove();
            $location.path('profiles');
        }
    };

    $scope.update = function() {
        var profile = $scope.profile;
        if (!profile.updated) {
            profile.updated = [];
        }
        profile.updated.push(new Date().getTime());

        profile.$update(function() {
            $location.path('profiles/' + profile._id);
        });
    };

    $scope.find = function() {
        Profiles.query(function(profiles) {
            $scope.profiles = profiles;
        });
    };

    $scope.findOne = function() {
        Profiles.get({
            profileId: $stateParams.profileId
        }, function(profile) {
            $scope.profile = profile;
        });
    };
}]);
