'use strict';

/**
 * @ngdoc service
 * @name clientApp.schemaSlotFactory
 * @description
 * # schemaSlotFactory
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('schemaSlotFactory', function ($resource) {
        return $resource('/api/schemas/:schemaId/slots/:slotId', {}, {});
    });