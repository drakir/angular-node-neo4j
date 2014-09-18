'use strict';

angular.module('clientApp')
  .controller('TeacherSchemasCtrl', function ($scope, $routeParams, teacherService) {

        teacherService.getTeacher($routeParams.teacherId, function(teacher) {
            $scope.$emit('footerName', teacher.name);
        });

        teacherService.findAllTeacherSchemas($routeParams.teacherId, function(schemas) {
            $scope.schemas = schemas;
        });

  });
