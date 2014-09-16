'use strict';

angular.module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'btford.socket-io',
    'ui.bootstrap'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/students/:studentId/schemas/:schemaId', {
                templateUrl: 'views/studentschema.html',
                controller: 'StudentSchemaCtrl'
            })
            .when('/teachers/:teacherId/schemas/:schemaId', {
              templateUrl: 'views/teacherschema.html',
              controller: 'TeacherSchemaCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
