'use strict';

angular.module('clientApp')
    .controller('StudentSchemaCtrl', function ($scope, $routeParams, studentService, schemaService, schemaSlotsPagingService) {
        //add it to the scope to make it accessible to SchemaCtrl
        $scope.schemaId = $routeParams.schemaId;

        studentService.getStudent($routeParams.studentId, function(student) {
            $scope.$emit('student', student);
        });

        $scope.bookSlot = function (slot) {
            var reservation = {
                studentId: $routeParams.studentId,
                schemaId: $routeParams.schemaId,
                slotId: slot.id
            };

            schemaService.book(reservation, {});
        };

        $scope.disabled = function (slot) {
            var reservedSlots = schemaSlotsPagingService.getReservedSlots();

            function isReservedSlot(slot) {
                return _.filter(reservedSlots, function (reservedSlot) {
                    return reservedSlot === slot;
                }).length > 0;
            }

            function studentAlreadyReservedASlot() {
                return _.findWhere(reservedSlots, {studentId: $routeParams.studentId}) !== undefined;
            }

            return isReservedSlot(slot) || studentAlreadyReservedASlot();
        };

    });
