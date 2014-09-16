'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:timePickerDirective
 * @description
 * # timePickerDirective
 */
angular.module('clientApp')
    .directive('timePickerDirective', function () {
        return {
            templateUrl: 'views/timepicker.html',
            restrict: 'E',
            scope: true,
            transclude: false
        };
    });
