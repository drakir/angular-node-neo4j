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
                controller: 'MainCtrl',
            })
            .when('/students/:studentId', {
                templateUrl: 'views/student.html',
                controller: 'StudentCtrl'
            })
            .when('/students/:studentId/schemas/:schemaId', {
                templateUrl: 'views/studentschema.html',
                controller: 'StudentSchemaCtrl'
            })
            .when('/teachers/:teacherId/schemas/:schemaId', {
                templateUrl: 'views/teacherschema.html',
                controller: 'TeacherSchemaCtrl'
            })
            .when('/teachers/:teacherId/schemas', {
                templateUrl: 'views/teacherschemas.html',
                controller: 'TeacherSchemasCtrl',
            })
            .when('/studentController', {
              templateUrl: 'views/studentcontroller.html',
              controller: 'StudentcontrollerCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
