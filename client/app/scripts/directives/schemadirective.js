'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:schemaDirective
 * @description
 * # schemaDirective
 */
angular.module('clientApp')
    .directive('schemaDirective', function () {
        return {
            templateUrl: 'views/schema.html',
            restrict: 'E',
            scope: true,
            transclude: false
        };
    });
