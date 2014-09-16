'use strict';

/**
 * @ngdoc service
 * @name clientApp.studentFactory
 * @description
 * # studentFactory
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('studentFactory', function ($resource) {
        return $resource('/api/students/:id', {}, {});
    });