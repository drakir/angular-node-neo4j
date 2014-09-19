'use strict';

angular.module('clientApp')
    .controller('StudentCtrl', function ($scope, $routeParams, studentService) {
        studentService.getStudent($routeParams.studentId, function (student) {
            $scope.student = student;
        });
    });
