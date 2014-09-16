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
        return {
            getTeacher: function(teacherId, successCallback, errorCallback) {
                return teacherFactory.get({id: teacherId}).$promise.then(successCallback, errorCallback);
            }
        };
  });
