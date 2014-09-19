'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:breadcrumb
 * @description
 * # breadcrumb
 */
angular.module('clientApp')
    .directive('breadcrumb', function () {
        return {
            template: '<ol ng-if="display" class="ab-nav breadcrumb">' +
                '<li ng-repeat="breadcrumb in breadcrumbs.get() track by breadcrumb.path" ng-class="{ active: $last }">' +
                '<a ng-if="!$last" ng-href="#{{ breadcrumb.path }}" ng-bind="breadcrumb.label" class="margin-right-xs"></a>' +
                '<span ng-if="$last" ng-bind="breadcrumb.label"></span>' +
                '</li>' +
                '</ol>',
            restrict: 'E',
            scope: {
                staticLabel: '@',
                dynamicLabel: '='
            },
            controller: function ($scope, breadcrumbs) {
                $scope.breadcrumbs = breadcrumbs;
            },
            link: function (scope) {
                scope.display = true;

                if (scope.staticLabel) {
                    scope.$watch('staticLabel', function (label) {
                        if (label) {
                            var values = scope.breadcrumbs.get();
                            _.last(values).label = label;
                        }
                    });
                } else if (!scope.staticLabel) {
                    scope.$watch('dynamicLabel', function (label) {
                        if (label) {
                            var values = scope.breadcrumbs.get();
                            _.last(values).label = label;
                        }
                    });
                }
            }
        };
    });
