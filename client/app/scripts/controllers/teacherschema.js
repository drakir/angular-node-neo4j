'use strict';

angular.module('clientApp')
    .controller('TeacherSchemaCtrl', function ($scope, $routeParams, teacherService, schemaService, dateTimeService) {
        //add it to the scope to make it accessible to SchemaCtrl
        $scope.schemaId = $routeParams.schemaId;

        $scope.selectedDate = new Date();

        $scope.slot = {
            date: '',
            fromTime: '',
            toTime: ''
        };

        teacherService.getTeacher($routeParams.teacherId, function(teacher) {
            $scope.$emit('teacher', teacher);
        });

        $scope.disabled = function () {
            return true;
        };

        $scope.addSlot = function (slot) {
            var timeSlot = {
                title: '',
                from: dateTimeService.formatToDateTime(slot.date, slot.fromTime, undefined),
                to: dateTimeService.formatToDateTime(slot.date, slot.toTime, undefined)
            };

            schemaService.addSchemaSlot($routeParams.schemaId, timeSlot);
        };
    });
