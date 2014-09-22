'use strict';

angular.module('clientApp')
    .controller('TeacherClassCtrl', function ($scope, $routeParams, teacherService) {

        teacherService.getTeacher($routeParams.teacherId, function(teacher) {
            $scope.$emit('footerName', teacher.name);
        });

        teacherService.findAllTeacherClasses($routeParams.teacherId, function(classes) {
            $scope.classes = classes;
        });

    });
