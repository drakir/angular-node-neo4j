'use strict';

describe('Controller: StudentSchemaCtrl', function () {

    // load the controller's module
    beforeEach(module('clientApp'));

    var StudentSchemaCtrl,
        scope,
        mockSchemaService,
        mockSocketFactory;

    var mockSchema = {id: '1', name: 'Höstschema 2015'};
    var mockSchemaSlots = [
        {'isToday': false, 'day': 'Thursday 11/9', 'slot': [
            {'id': '4d07b440-398d-11e4-8475-e36b8dc15c71', 'title': '', 'from': '2014-09-11 08:00:00', 'to': '2014-09-11 09:00:00', 'studentId': null, 'studentName': null, 'time': '08:00-09:00'}
        ]},
        {'isToday': false, 'day': 'Friday 12/9', 'slot': [
            {'id': '4f6887a0-398d-11e4-8475-e36b8dc15c71', 'title': '', 'from': '2014-09-12 08:00:00', 'to': '2014-09-12 09:00:00', 'studentId': null, 'studentName': null, 'time': '08:00-09:00'}
        ]},
        {'isToday': false, 'day': 'Saturday 13/9', 'slot': [
            {'id': '4fd700e0-398d-11e4-8475-e36b8dc15c71', 'title': '', 'from': '2014-09-13 08:00:00', 'to': '2014-09-13 09:00:00', 'studentId': null, 'studentName': null, 'time': '08:00-09:00'},
            {'id': '5a4dd620-398d-11e4-8475-e36b8dc15c71', 'title': '', 'from': '2014-09-13 13:00:00', 'to': '2014-09-13 15:00:00', 'studentId': '8564d720-38d7-11e4-afdd-8fcacdd16f0a', 'studentName': 'Julia Lindström', 'time': '13:00-15:00'}
        ]}
    ];

    var reservedSlot = mockSchemaSlots[2].slot[1];
    var unreservedSlot = mockSchemaSlots[0].slot[0];

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        spyOn(scope, "$emit");

        mockSchemaService = {
            getSchema: function (schemaId, successCallback) {
                successCallback(mockSchema);
            }
        };

        var mockSchemaSlotsPagingService = {
            loadSchemaSlots: function (schemaId, successCallback) {
                successCallback(mockSchemaSlots);
            },
            getReservedSlots: function () {
                var reservedSlots = [];
                reservedSlots.push(reservedSlot);
                return reservedSlots;
            }
        };

        var mockStudentService = {
            getStudent: function(studentId, successCallback) {
                successCallback({id: studentId, name: "Julia"});
            }
        };

        mockSocketFactory = {
            on: function () {
            }
        };


        StudentSchemaCtrl = $controller('StudentSchemaCtrl', {
            $scope: scope,
            $routeParams: {
                schemaId: 1,
                studentId: '8564d720-38d7-11e4-afdd-8fcacdd16f0a'
            },
            schemaService: mockSchemaService,
            schemaSlotsPagingService: mockSchemaSlotsPagingService,
            socket: mockSocketFactory,
            studentService: mockStudentService
        });
    }));


    it('should attach the schema to the scope', function () {
        expect(scope.schema).toBe(mockSchema);
    });

    it('should attach schemaSlots to the scope', function () {
        expect(scope.filteredSchemaSlots).toBe(mockSchemaSlots);
    });

    it('should disable the time slot button when the slot is already reserved', function () {
        expect(scope.disabled(reservedSlot)).toBe(true);
    });

    it('should disable the time slot button when a slot is already reserved by the student', function () {
        expect(scope.disabled(unreservedSlot)).toBe(true);
    });

    it('should emit an event when a student has been loaded', function() {
        expect(scope.$emit).toHaveBeenCalledWith('footerName', 'Julia');
    });

});
