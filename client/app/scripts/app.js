'use strict';

angular.module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'btford.socket-io',
    'ui.bootstrap',
    'ng-breadcrumbs'
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                label: 'Hem'
            })
            .when('/students/:studentId', {
                templateUrl: 'views/student.html',
                label: 'Studenter',
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
                label: 'Scheman'
            })
            .when('/studentController', {
              templateUrl: 'views/studentcontroller.html',
              controller: 'StudentcontrollerCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
