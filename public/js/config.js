'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('all articles', {
        url: '/articles',
        templateUrl: 'views/articles/list.html'
    })
      .state('create article', {
        url: '/articles/create',
        templateUrl: 'views/articles/create.html'
    })
      .state('edit article', {
        url: '/articles/:articleId/edit',
        templateUrl: 'views/articles/edit.html'
    })
      .state('article by id', {
        url: '/articles/:articleId',
        templateUrl: 'views/articles/view.html'
    })

      .state('all dossiers', {
        url: '/dossiers',
        templateUrl: 'views/dossiers/list.html'
    })
      .state('create dossier', {
        url: '/dossiers/create',
        templateUrl: 'views/dossiers/create.html'
    })
      .state('edit dossier', {
        url: '/dossiers/:dossierId/edit',
        templateUrl: 'views/dossiers/edit.html'
    })
      .state('dossier by id', {
        url: '/dossiers/:dossierId',
        templateUrl: 'views/dossiers/view.html'
    })

      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
