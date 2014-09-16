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
        ]}
    ];


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();

        mockSchemaService = {
            getSchema: function (schemaId, successCallback) {
                successCallback(mockSchema);
            }
        };

        var mockSchemaSlotsPagingService = {
            loadSchemaSlots: function (schemaId, successCallback) {
                successCallback(mockSchemaSlots);
            }
        };

        mockSocketFactory = {
          on: function() {
          }
        };


        StudentSchemaCtrl = $controller('StudentSchemaCtrl', {
            $scope: scope,
            $routeParams: {id: '477ace40-398d-11e4-8475-e36b8dc15c71'},
            schemaService: mockSchemaService,
            schemaSlotsPagingService: mockSchemaSlotsPagingService,
            socket: mockSocketFactory
        });
    }));


    it('should attach the schema to the scope', function () {
        expect(scope.schema).toBe(mockSchema);
    });

    it('should attach schemaSlots to the scope', function () {
        expect(scope.filteredSchemaSlots).toBe(mockSchemaSlots);
    });
});
