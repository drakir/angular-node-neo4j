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
            getSchema: function (schemaId, successCallback, errorCallback) {
                schemaFactory.get({id: schemaId}).$promise.then(
                    function (result) {
                        successCallback(result);
                    }, function (error) {
                        if (_.isFunction(errorCallback)) {
                            errorCallback(error);
                        } else {
                            console.log(error);
                        }
                    });
            }
        };
    });
