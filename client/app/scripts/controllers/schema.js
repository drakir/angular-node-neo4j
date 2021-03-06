'use strict';

angular.module('clientApp')
    .controller('SchemaCtrl', function ($scope, schemaService, schemaSlotsPagingService, socket) {

        schemaService.getSchema($scope.schemaId, function (schema) {
            $scope.schema = schema;
        });

        function renderSlots() {
            schemaSlotsPagingService.loadSchemaSlots($scope.schemaId, function (schemaSlots) {
                $scope.filteredSchemaSlots = schemaSlots;
            });
        }

        renderSlots();

        socket.on('newSlot', function () {
            renderSlots();
        });

        socket.on('slotUpdated', function () {
            renderSlots();
        });

        $scope.next = function ($event) {
            $scope.filteredSchemaSlots = schemaSlotsPagingService.next($event);
        };

        $scope.previous = function ($event) {
            $scope.filteredSchemaSlots = schemaSlotsPagingService.previous($event);
        };

        $scope.hasPrevious = function () {
            return schemaSlotsPagingService.hasPrevious();
        };

        $scope.hasNext = function () {
            return schemaSlotsPagingService.hasNext();
        };

    });
