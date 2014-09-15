'use strict';

/**
 * @ngdoc service
 * @name clientApp.schemaFactory
 * @description
 * # schemaFactory
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('schemaFactory', function ($resource) {
        return $resource('/api/schemas/:id', {}, {});
    });
