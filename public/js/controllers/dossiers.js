'use strict';

angular.module('utingen.dossiers').controller('DossiersController', ['$scope', '$stateParams', '$location', 'Global', 'Dossiers', function ($scope, $stateParams, $location, Global, Dossiers) {
    $scope.global = Global;

    $scope.create = function() {
        var dossier = new Dossiers({
            title: this.title,
            content: this.content
        });
        dossier.$save(function(response) {
            $location.path('dossiers/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(dossier) {
        if (dossier) {
            dossier.$remove();

            for (var i in $scope.dossiers) {
                if ($scope.dossiers[i] === dossier) {
                    $scope.dossiers.splice(i, 1);
                }
            }
        }
        else {
            $scope.dossier.$remove();
            $location.path('dossiers');
        }
    };

    $scope.update = function() {
        var dossier = $scope.dossier;
        if (!dossier.updated) {
            dossier.updated = [];
        }
        dossier.updated.push(new Date().getTime());

        dossier.$update(function() {
            $location.path('dossiers/' + dossier._id);
        });
    };

    $scope.find = function() {
        Dossiers.query(function(dossiers) {
            $scope.dossiers = dossiers;
        });
    };

    $scope.findOne = function() {
        Dossiers.get({
            dossierId: $stateParams.dossierId
        }, function(dossier) {
            $scope.dossier = dossier;
        });
    };
}]);