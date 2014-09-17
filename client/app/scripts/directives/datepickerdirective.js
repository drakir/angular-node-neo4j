'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:timePickerDirective
 * @description
 * # timePickerDirective
 */
angular.module('clientApp')
    .directive('datePickerDirective', function () {
        return {
            templateUrl: 'views/datepicker.html',
            controller: 'DatePickerCtrl',
            restrict: 'E',
            scope: {
                selectedDate: '='
            }
        };
    });
