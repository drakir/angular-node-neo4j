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
            .when('/students/:studentId/schemas/:schemaId', {
                templateUrl: 'views/studentschema.html',
                controller: 'StudentSchemaCtrl'
            })
            .when('/teachers/:teacherId/schemas', {
                templateUrl: 'views/teacherschemas.html',
                controller: 'TeacherSchemasCtrl'
            })
            .when('/teachers/:teacherId/schemas/:schemaId', {
                templateUrl: 'views/teacherschema.html',
                controller: 'TeacherSchemaCtrl'
            })
            .when('/teachers/:teacherId/classes/', {
                templateUrl: 'views/teacherclasses.html',
                controller: 'TeacherClassCtrl'
            })
            .when('/teachers/:teacherId/classes/:class', {
                templateUrl: 'views/teacherclass.html',
                controller: 'TeacherClassCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
