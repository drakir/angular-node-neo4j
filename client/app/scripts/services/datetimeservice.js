'use strict';

/**
 * @ngdoc service
 * @name clientApp.dateTimeService
 * @description
 * # dateTimeService
 * Service in the clientApp.
 */
angular.module('clientApp')
    .service('dateTimeService', function dateTimeService(stringService) {
        return {
            isToday: function (date) {
                return moment(date).format('YYYYMMDD') === moment().format('YYYYMMDD');
            },
            formatDate: function (date) {
                return stringService.capitaliseFirstLetter(moment(date).locale('sv').format('dddd D/M'));
            },
            formatTime: function (date) {
                return moment(date).format('HH:mm');
            },
            dayInYear: function (date) {
                return parseInt(moment(date).format('DDD'));
            }
        };
    });
