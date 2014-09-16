'use strict';

describe('Controller: StudentSchemaCtrl', function () {

    // load the controller's module
    beforeEach(module('clientApp'));

    var StudentSchemaCtrl,
        scope;

    var reservedSlot = {'id': '5a4dd620-398d-11e4-8475-e36b8dc15c71', 'title': '', 'from': '2014-09-13 13:00:00', 'to': '2014-09-13 15:00:00', 'studentId': '8564d720-38d7-11e4-afdd-8fcacdd16f0a', 'studentName': 'Julia Lindström', 'time': '13:00-15:00'};
    var unreservedSlot = {'id': '4d07b440-398d-11e4-8475-e36b8dc15c71', 'title': '', 'from': '2014-09-11 08:00:00', 'to': '2014-09-11 09:00:00', 'studentId': null, 'studentName': null, 'time': '08:00-09:00'};

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        spyOn(scope, '$emit');

        var mockRouteParams = {
            schemaId: '1',
            studentId: '8564d720-38d7-11e4-afdd-8fcacdd16f0a'
        };

        var mockStudentService = {
            getStudent: function (studentId, successCallback) {
                successCallback({id: studentId, name: 'Julia'});
            }
        };

        var mockSchemaSlotsPagingService = {
            getReservedSlots: function () {
                var reservedSlots = [];
                reservedSlots.push(reservedSlot);
                return reservedSlots;
            }
        };

        var mockSchemaService = {

        };

        StudentSchemaCtrl = $controller('StudentSchemaCtrl', {
            $scope: scope,
            $routeParams: mockRouteParams,
            studentService: mockStudentService,
            schemaService: mockSchemaService,
            schemaSlotsPagingService: mockSchemaSlotsPagingService
        });
    }));

    it('should attach routeParams.schemaID to scope', function () {
        expect(scope.schemaId).toBe('1');
    });

    it('should emit an event when a student has been loaded', function () {
        expect(scope.$emit).toHaveBeenCalledWith('footerName', 'Julia');
    });

    it('should disable the time slot button when the slot is already reserved', function () {
        expect(scope.disabled(reservedSlot)).toBe(true);
    });

    it('should disable the time slot button when a slot is already reserved by the student', function () {
        expect(scope.disabled(unreservedSlot)).toBe(true);
    });

});
