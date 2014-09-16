'use strict';

/**
 * @ngdoc service
 * @name clientApp.teacherFactory
 * @description
 * # teacherFactory
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('teacherFactory', function ($resource) {
        return $resource('/api/teachers/:id', {}, {});
    });
