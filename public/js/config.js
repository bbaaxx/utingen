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

    // Profile routes
      .state('all profiles', {
        url: '/profiles',
        templateUrl: 'views/profiles/list.html'
    })
      .state('create profile', {
        url: '/profiles/create',
        templateUrl: 'views/profiles/create.html'
    })
      .state('edit profile', {
        url: '/profiles/:profileId/edit',
        templateUrl: 'views/profiles/edit.html'
    })
      .state('profile by id', {
        url: '/profiles/:profileId',
        templateUrl: 'views/profiles/view.html'
    })

    // Skill routes
      .state('all skills', {
        url: '/skills',
        templateUrl: 'views/skills/list.html'
    })
      .state('create skill', {
        url: '/skills/create',
        templateUrl: 'views/skills/create.html'
    })
      .state('edit skill', {
        url: '/skills/:skillId/edit',
        templateUrl: 'views/skills/edit.html'
    })
      .state('skill by id', {
        url: '/skills/:skillId',
        templateUrl: 'views/skills/view.html'
    })

    // Default state
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
