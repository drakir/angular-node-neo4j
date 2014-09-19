'use strict';

/**
 * @ngdoc service
 * @name clientApp.teacherService
 * @description
 * # teacherService
 * Service in the clientApp.
 */
angular.module('clientApp')
    .service('teacherService', function teacherService(teacherFactory) {
        function defaultErrorHandler(error, errorCallback) {
            if (_.isFunction(errorCallback)) {
                errorCallback(error);
            } else {
                console.log(error);
            }
        }

        return {
            getTeacher: function (teacherId, successCallback, errorCallback) {
                return teacherFactory.get({id: teacherId}).$promise.then(
                    function (teacher) {
                        successCallback(teacher);
                    }, function (error) {
                        defaultErrorHandler(error, errorCallback);
                    });
            },
            findAllTeacherSchemas: function (teacherId, successCallback, errorCallback) {
                teacherFactory.allSchemas({teacherId: teacherId}).$promise.then(
                    function (schemas) {
                        successCallback(schemas);
                    },
                    function (error) {
                        defaultErrorHandler(error, errorCallback);
                    }
                );
            },
            editTeacherSchema: function (teacherId, schema, successCallback, errorCallback) {
                teacherFactory.editSchema({teacherId: teacherId, schemaId: schema.id}, schema).$promise.then(
                    function (success) {
                        successCallback(success);
                    },
                    function (error) {
                        defaultErrorHandler(error, errorCallback);
                    }
                );
            }
        };
    });
