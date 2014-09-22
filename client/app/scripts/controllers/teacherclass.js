'use strict';

angular.module('clientApp')
    .controller('TeacherClassCtrl', function ($scope, $routeParams, teacherService, studentService, $location) {

        teacherService.getTeacher($routeParams.teacherId, function(teacher) {
            $scope.$emit('footerName', teacher.name);
        });

        teacherService.findAllTeacherClasses($routeParams.teacherId, function(classes) {
            $scope.classes = classes;
        });

        if ($routeParams.class) {
            studentService.findStudentsByClassName($routeParams.class, function(students) {
                $scope.students =  students;
            });
        }


        $scope.show = function(className) {
            $location.url('/teachers/'+$routeParams.teacherId+'/classes/'+className);
        }
    });
