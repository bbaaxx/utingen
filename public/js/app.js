'use strict';

angular.module('mean', [
    'ngCookies',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'mean.system',
    'mean.articles',
    'utingen.skills',
    'utingen.profiles'
]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('utingen.skills', []);
angular.module('utingen.profiles', []);