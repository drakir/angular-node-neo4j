'use strict';

/**
 * @ngdoc service
 * @name clientApp.stringService
 * @description
 * # stringService
 * Service in the clientApp.
 */
angular.module('clientApp')
    .service('stringService', function stringService() {
        return {
            capitaliseFirstLetter: function (string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        };
    });
