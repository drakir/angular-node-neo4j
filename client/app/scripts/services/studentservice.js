'use strict';

angular.module('clientApp')
  .service('studentService', function studentService(studentFactory) {
        return {
            getStudent: function(studentId, successCallback, errorCallback) {
                return studentFactory.get({id: studentId}).$promise.then(successCallback, errorCallback);
            }
        };
  });
