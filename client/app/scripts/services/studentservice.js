'use strict';

angular.module('clientApp')
  .service('studentService', function studentService(studentFactory) {
        return {
            getStudent: function(studentId, successCallback, errorCallback) {
                return studentFactory.get({id: studentId}).$promise.then(successCallback, errorCallback);
            },
            findStudentsByClassName: function(className, successCallback, errorCallback) {
                studentFactory.query({'class':className}).$promise.then(successCallback, errorCallback);
            }
        };
  });
