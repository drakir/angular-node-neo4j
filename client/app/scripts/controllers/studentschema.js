'use strict';

angular.module('clientApp')
    .controller('StudentSchemaCtrl', function ($scope, $routeParams, schemaService, schemaSlotsPagingService) {
        schemaService.getSchema($routeParams.schemaId, function (schema) {
            $scope.schema = schema;
        });

        schemaSlotsPagingService.loadSchemaSlots($routeParams.schemaId, function (schemaSlots) {
            $scope.filteredSchemaSlots = schemaSlots;
        });

        $scope.next = function ($event) {
            $scope.filteredSchemaSlots = schemaSlotsPagingService.next($event);
        }

        $scope.previous = function ($event) {
            $scope.filteredSchemaSlots = schemaSlotsPagingService.previous($event);
        }

        $scope.hasPrevious = function () {
            return schemaSlotsPagingService.hasPrevious();
        }

        $scope.hasNext = function () {
            return schemaSlotsPagingService.hasNext();
        }

    });
