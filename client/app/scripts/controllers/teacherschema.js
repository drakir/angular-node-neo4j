'use strict';

angular.module('clientApp')
    .controller('TeacherSchemaCtrl', function ($scope, $routeParams, teacherService) {
        //add it to the scope to make it accessible to SchemaCtrl
        $scope.schemaId = $routeParams.schemaId;

        teacherService.getTeacher($routeParams.teacherId, function(teacher) {
            $scope.$emit('footerName', teacher.name);
        });

        $scope.disabled = function () {
            return true;
        };

    });
