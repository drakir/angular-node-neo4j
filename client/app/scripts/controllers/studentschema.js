'use strict';

angular.module('clientApp')
    .controller('StudentSchemaCtrl', function ($scope, $routeParams, schemaService, schemaSlotsPagingService, socket) {

        schemaService.getSchema($routeParams.schemaId, function (schema) {
            $scope.schema = schema;
        });

        function renderSlots() {
            schemaSlotsPagingService.loadSchemaSlots($routeParams.schemaId, function (schemaSlots) {
                $scope.filteredSchemaSlots = schemaSlots;
            });
        }

        renderSlots();

        socket.on('newSlot', function() {
            renderSlots();
        });

        socket.on('slotUpdated', function() {
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

        $scope.bookSlot = function (slot) {
            var reservation = {
                studentId: $routeParams.studentId,
                schemaId: $routeParams.schemaId,
                slotId: slot.id
            };

            schemaService.book(reservation, {});
        };

    });
