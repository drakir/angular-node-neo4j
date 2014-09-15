'use strict';

/**
 * @ngdoc service
 * @name clientApp.schemaService
 * @description
 * # schemaService
 * Service in the clientApp.
 */
angular.module('clientApp')
    .service('schemaService', function schemaService(schemaFactory) {
        return {
            getSchema: function (schemaId) {
                return schemaFactory.get({id: schemaId});
            }
        };
    });
