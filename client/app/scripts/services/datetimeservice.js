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
        var defaultDateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

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
            },
            /**
             *
             * @param dateStr a typical date represented by a string, such as YYYY-MM-DD
             * @param timeStr a time string, ie 10:00
             * @param format
             */
            formatToDateTime: function (dateStr, timeStr, format) {
                function parseHours(time) {
                    if (time === '') {
                        return '0';
                    }
                    return time.substring(0, time.indexOf(':'));
                }

                function parseMinutes(time) {
                    if (time === '') {
                        return '0';
                    }
                    return time.substring(time.indexOf(':') + 1, time.length);
                }


                if (!format) {
                    format = defaultDateTimeFormat;
                }
                var date = moment(dateStr).startOf('day');
                var hours = parseHours(timeStr);
                var minutes = parseMinutes(timeStr);

                return date.add(hours, 'hours').add(minutes, 'minutes').format(format);
            }
        };
    });