'use strict';

angular.module('clientApp')
    .controller('StudentSchemaCtrl', function ($scope, $routeParams, studentService) {

        $scope.studentId = $routeParams.studentId;
        $scope.schemaId = $routeParams.schemaId;

        studentService.getStudent($routeParams.studentId, function(student) {
            $scope.$emit('footerName', student.name);
        });
    });
