'use strict';

/**
 * @ngdoc service
 * @name clientApp.schemaService
 * @description
 * # schemaService
 * Service in the clientApp.
 */
angular.module('clientApp')
    .service('schemaService', function schemaService(schemaFactory, schemaSlotFactory, dateTimeService) {
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
            },
            getSchemaSlots: function (schemaId, successCallback) {
                var slots = {};
                schemaSlotFactory.query({schemaId: schemaId}, function (data) {

                    _.each(data, function (slot) {
                        var fromTime = dateTimeService.formatTime(slot.from);
                        var toTime = dateTimeService.formatTime(slot.to);
                        var day =  dateTimeService.dayInYear(slot.from);

                        slots[day] = slots[day] || {
                            isToday: dateTimeService.isToday(slot.from),
                            day: dateTimeService.formatDate(slot.from),
                            slot: []
                        };

                        slot.time = fromTime + '-' + toTime;
                        slots[day].slot.push(slot);
                    });

                    return successCallback(_.sortBy(slots));
                });
            }
        };
    });
