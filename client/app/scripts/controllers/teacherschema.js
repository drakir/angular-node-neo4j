'use strict';

angular.module('clientApp')
    .controller('TeacherSchemaCtrl', function ($scope, $routeParams, teacherService, schemaService) {
        //add it to the scope to make it accessible to SchemaCtrl
        $scope.schemaId = $routeParams.schemaId;

        teacherService.getTeacher($routeParams.teacherId, function(teacher) {
            $scope.$emit('footerName', teacher.name);
        });

        $scope.disabled = function () {
            return true;
        };

        $scope.addSlot = function (slot) {
            function parseHours(time) {
                if (time === '') {
                    return '0';
                }
                return time.substring(0, time.indexOf(':'));
            }

            function parseMinutes(time) {
                if (time === '') {
                    return '0';
                }
                return time.substring(time.indexOf(':') + 1, time.length);
            }

            var from = moment(slot.date).startOf('day').add(parseHours(slot.fromTime), 'hours').add(parseMinutes(slot.fromTime), 'minutes');
            var to = moment(slot.date).startOf('day').add(parseHours(slot.toTime), 'hours').add(parseMinutes(slot.toTime), 'minutes');

            var timeSlot = {
                title: '',
                from: from.format('YYYY-MM-DD HH:mm:ss'),
                to: to.format('YYYY-MM-DD HH:mm:ss')
            };

            schemaService.addSchemaSlot($routeParams.schemaId, timeSlot);
        };

    });
