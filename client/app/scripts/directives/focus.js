'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:focus
 * @description
 * # focus
 */
angular.module('clientApp')
    .directive('focus', function ($timeout) {
        return {
            restrict: 'A',
            scope: { trigger: '@focus' },
            link: function (scope, element) {
                scope.$watch('trigger', function (value) {
                    if (value === 'true') {
                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                });
            }
        };
    });
