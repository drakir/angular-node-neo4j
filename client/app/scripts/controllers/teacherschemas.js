'use strict';

angular.module('clientApp')
    .controller('TeacherSchemasCtrl', function ($scope, $routeParams, teacherService, $location) {

        teacherService.getTeacher($routeParams.teacherId, function (teacher) {
            $scope.$emit('footerName', teacher.name);
        });

        function findAllTeacherSchemas() {
            teacherService.findAllTeacherSchemas($routeParams.teacherId, function (schemas) {
                $scope.schemas = schemas;
            });
        }

        findAllTeacherSchemas();

        $scope.edit = function (schema, key, value) {
            schema[key] = value;
            teacherService.editTeacherSchema($routeParams.teacherId, schema, function () {
            });
        };

        $scope.save = function () {
            var schema = {
                name: $scope.name
            };

            teacherService.addTeacherSchema($routeParams.teacherId, schema, function (schema) {
                $scope.addSchema = false;
                $location.url('/teachers/'+$routeParams.teacherId+'/schemas/'+schema.id);
            });
        };

        $scope.delete = function (schema) {
            teacherService.deleteTeacherSchema($routeParams.teacherId, schema, function () {
                findAllTeacherSchemas();
            });
        };

        $scope.show = function(schema) {
            $location.url('/teachers/'+$routeParams.teacherId+'/schemas/'+schema.id);
        };
    });
