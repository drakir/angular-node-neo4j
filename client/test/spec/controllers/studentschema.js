'use strict';

describe('Controller: StudentSchemaCtrl', function () {

    // load the controller's module
    beforeEach(module('clientApp'));

    var StudentSchemaCtrl,
        scope,
        mockSchemaService;

    var mockSchema = {id: '1', name: 'Höstschema 2015'};
    var mockSchemaSlot = [
        {1: {
            isToday: true,
            day: '2014-15-09',
            slot: []
        }},
        {2: {
            isToday: true,
            day: '2014-15-09',
            slot: []
        }}
    ];

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();

        mockSchemaService = {
            getSchema: function (schemaId, successCallback) {
                successCallback(mockSchema);
            },
            getSchemaSlots: function (schemaId, successCallback) {
                successCallback(mockSchemaSlot);
            }
        };

        StudentSchemaCtrl = $controller('StudentSchemaCtrl', {
            $scope: scope,
            $routeParams: {id: '477ace40-398d-11e4-8475-e36b8dc15c71'},
            schemaService: mockSchemaService
        });
    }));


    it('should attach the schema to the scope', function () {
        expect(scope.schema).toBe(mockSchema);
    });

    it('should attach schemaSlots to the scope', function () {
        expect(scope.filteredSchemaSlots).toBe(mockSchemaSlot);
    });
});
