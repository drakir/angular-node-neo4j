'use strict';

/**
 * @ngdoc service
 * @name clientApp.schemaSlotsPagingService
 * @description
 * # schemaSlotsPagingService
 * Service in the clientApp.
 */
angular.module('clientApp')
    .service('schemaSlotsPagingService', function schemaSlotsPagingService(schemaService) {

        var slots = [];
        var filteredSlots = [];

        return {
            loadSchemaSlots: function (schemaId, successCallback) {
                schemaService.getSchemaSlots(schemaId, function (schemaSlots) {
                    slots = schemaSlots;
                    var firstSlot = _.first(filteredSlots);
                    var indexOfSlot;

                    if (firstSlot !== undefined) {
                        indexOfSlot = _.indexOf(slots, _.findWhere(slots, {day: firstSlot.day}));
                    }

                    //first 5 slots
                    if (firstSlot === undefined || indexOfSlot === -1) {
                        filteredSlots = _.first(slots, 5);
                    } else {
                        //show from same start day
                        filteredSlots = _.first(_.rest(slots, indexOfSlot), 5);
                    }

                    successCallback(filteredSlots);
                });
            },

            hasPrevious: function () {
                var firstSlot = _.first(filteredSlots);
                var indexOfSlot = _.indexOf(slots, firstSlot);
                return indexOfSlot > 0;
            },

            previous: function ($event) {
                $event.preventDefault();

                var firstSlot = _.first(filteredSlots);
                var indexOfSlot = _.indexOf(slots, firstSlot);

                if (indexOfSlot > 5) {
                    filteredSlots = _.first(_.rest(slots, indexOfSlot - 5), 5);
                }
                else {
                    filteredSlots = _.first(slots, 5);
                }

                return filteredSlots;
            },

            hasNext: function () {
                var lastSlot = _.last(filteredSlots);
                var indexOfSlot = _.indexOf(slots, lastSlot);
                var lastIndex = slots.length - 1;
                return indexOfSlot < lastIndex;
            },

            next: function ($event) {
                $event.preventDefault();

                var lastSlot = _.last(filteredSlots);
                var indexOfSlot = _.indexOf(slots, lastSlot);
                var lastIndex = slots.length - 1;

                if (indexOfSlot < lastIndex) {
                    var slotsLeft = lastIndex - indexOfSlot;
                    filteredSlots = _.first(_.rest(slots, indexOfSlot + 1), slotsLeft > 5 ? 5 : slotsLeft);
                }

                return filteredSlots;
            },
            getReservedSlots: function() {
                var allSlots = [];
                _.each(slots, function (schemaSlot) {
                    _.each(schemaSlot.slot, function (slot) {
                        allSlots.push(slot);
                    });
                });

                return _.filter(allSlots, function (slot) {
                    return slot.studentId !== null;
                });
            }
        };
    });
