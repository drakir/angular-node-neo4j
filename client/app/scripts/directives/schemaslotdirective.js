'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:schemaSlotDirective
 * @description
 * # schemaSlotDirective
 */
angular.module('clientApp')
    .directive('schemaSlotDirective', function () {
        return {
            templateUrl: 'views/schemaslot.html',
            restrict: 'E',
            scope: false
        };
    });