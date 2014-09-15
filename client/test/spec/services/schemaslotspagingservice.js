'use strict';

describe('Service: schemaSlotsPagingService', function () {

    // load the service's module
    beforeEach(module('clientApp'));

    // instantiate service
    var schemaSlotsPagingService;

    var mockSchemaSlotService = {
        getSchemaSlots: function (schemaId, successCallback) {
            successCallback(slots);
        }
    };

    var mockEvent = {
        preventDefault: function () {
        }
    };

    var schemaId = 1;

    var slots = [
        {'isToday': false, 'day': 'Thursday 11/9', 'slot': [
            {'id': '4d07b440-398d-11e4-8475-e36b8dc15c71', 'title': '', 'from': '2014-09-11 08:00:00', 'to': '2014-09-11 09:00:00', 'studentId': null, 'studentName': null, 'time': '08:00-09:00'}
        ]},
        {'isToday': false, 'day': 'Friday 12/9', 'slot': [
            {'id': '4f6887a0-398d-11e4-8475-e36b8dc15c71', 'title': '', 'from': '2014-09-12 08:00:00', 'to': '2014-09-12 09:00:00', 'studentId': null, 'studentName': null, 'time': '08:00-09:00'}
        ]},
        {'isToday': false, 'day': 'Saturday 13/9', 'slot': [
            {'id': '4fd700e0-398d-11e4-8475-e36b8dc15c71', 'title': '', 'from': '2014-09-13 08:00:00', 'to': '2014-09-13 09:00:00', 'studentId': null, 'studentName': null, 'time': '08:00-09:00'},
            {'id': '5a4dd620-398d-11e4-8475-e36b8dc15c71', 'title': '', 'from': '2014-09-13 13:00:00', 'to': '2014-09-13 15:00:00', 'studentId': '8564d720-38d7-11e4-afdd-8fcacdd16f0a', 'studentName': 'Julia Lindström', 'time': '13:00-15:00'}
        ]},
        {'isToday': false, 'day': 'Sunday 14/9', 'slot': [
            {'id': '503a5690-398d-11e4-8475-e36b8dc15c71', 'title': '', 'from': '2014-09-14 08:00:00', 'to': '2014-09-14 09:00:00', 'studentId': null, 'studentName': null, 'time': '08:00-09:00'}
        ]},
        {'isToday': true, 'day': 'Monday 15/9', 'slot': [
            {'id': '50bb4660-398d-11e4-8475-e36b8dc15c71', 'title': '', 'from': '2014-09-15 08:00:00', 'to': '2014-09-15 09:00:00', 'studentId': null, 'studentName': null, 'time': '08:00-09:00'}
        ]},
        {'isToday': false, 'day': 'Tuesday 16/9', 'slot': [
            {'id': '514efae0-398d-11e4-8475-e36b8dc15c71', 'title': '', 'from': '2014-09-16 08:00:00', 'to': '2014-09-16 09:00:00', 'studentId': null, 'studentName': null, 'time': '08:00-09:00'}
        ]}
    ];

    beforeEach(function () {
        module(function ($provide) {
            $provide.value('schemaService', mockSchemaSlotService);
        });
    });

    beforeEach(inject(function (_schemaSlotsPagingService_) {
        schemaSlotsPagingService = _schemaSlotsPagingService_;
    }));


    it('should return the first 5 slots on first call', function () {
        schemaSlotsPagingService.loadSchemaSlots(schemaId, function (slots) {
            expect(slots.length).toBe(5);
        });
    });

    it('should return the next records on calling next', function () {
        schemaSlotsPagingService.loadSchemaSlots(schemaId, function () {
        });
        var schemaSlots = schemaSlotsPagingService.next(mockEvent);
        expect(schemaSlots.length).toBe(1);
    });

    it('should return the same position after a reload as the previously loaded next', function () {
        schemaSlotsPagingService.loadSchemaSlots(schemaId, function () {
        });
        schemaSlotsPagingService.next(mockEvent);
        schemaSlotsPagingService.loadSchemaSlots(schemaId, function (slots) {
            expect(slots.length).toBe(1);
        });
    });

    it('should step to next, then back to the previous 5 records', function () {
        schemaSlotsPagingService.loadSchemaSlots(schemaId, function () {
        });
        schemaSlotsPagingService.next(mockEvent);

        var schemaSlots = schemaSlotsPagingService.previous(mockEvent);
        expect(schemaSlots.length).toBe(5);
    });

    it('should have next when on first page', function () {
        schemaSlotsPagingService.loadSchemaSlots(schemaId, function () {
        });
        expect(schemaSlotsPagingService.hasNext()).toBe(true);
    });

    it('should not have previous when on first page', function () {
        schemaSlotsPagingService.loadSchemaSlots(schemaId, function () {
        });
        expect(schemaSlotsPagingService.hasPrevious()).toBe(false);
    });

    it('should have previous when on 2nd page', function () {
        schemaSlotsPagingService.loadSchemaSlots(schemaId, function () {
        });
        schemaSlotsPagingService.next(mockEvent);
        expect(schemaSlotsPagingService.hasPrevious()).toBe(true);
    });


});
