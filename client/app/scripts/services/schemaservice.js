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
        function defaultErrorHandler(error, errorCallback) {
            if (_.isFunction(errorCallback)) {
                errorCallback(error);
            } else {
                console.log(error);
            }
        }

        return {
            getSchema: function (schemaId, successCallback, errorCallback) {
                schemaFactory.get({id: schemaId}).$promise.then(
                    function (result) {
                        successCallback(result);
                    }, function (error) {
                        defaultErrorHandler(error, errorCallback);
                    });
            },
            getSchemaSlots: function (schemaId, successCallback) {
                var slots = {};
                schemaSlotFactory.query({schemaId: schemaId}, function (data) {

                    _.each(data, function (slot) {
                        var fromTime = dateTimeService.formatTime(slot.from);
                        var toTime = dateTimeService.formatTime(slot.to);
                        var day = dateTimeService.dayInYear(slot.from);

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
            },
            addSchemaSlot: function (schemaId, slot, successCallback, errorCallback) {
                schemaSlotFactory.save({schemaId: schemaId}, slot).$promise.then(
                    function (result) {
                        if (_.isFunction(successCallback)) {
                            successCallback(result);
                        }
                    },
                    function (error) {
                        defaultErrorHandler(error, errorCallback);
                    });
            },
            book: function (reservation, successCallback, errorCallback) {
                var params = {
                    schemaId: reservation.schemaId,
                    slotId: reservation.slotId
                };
                var body = {
                    studentId: reservation.studentId
                };
                schemaSlotFactory.book(params, body).$promise.then(
                    function (result) {
                        if (_.isFunction(successCallback)) {
                            successCallback(result);
                        }
                    },
                    function (error) {
                        defaultErrorHandler(error, errorCallback);
                    });
            }
        };
    });
