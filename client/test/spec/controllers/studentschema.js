'use strict';

describe('Controller: StudentSchemaCtrl', function () {

    // load the controller's module
    beforeEach(module('clientApp'));

    var StudentSchemaCtrl,
        scope,
        mockSchema;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, schemaService) {
        scope = $rootScope.$new();

        var routeParams = {id: '477ace40-398d-11e4-8475-e36b8dc15c71'};
        mockSchema = {id: '1', name: 'Höstschema 2015'};

        spyOn(schemaService, 'getSchema').andReturn(mockSchema);

        StudentSchemaCtrl = $controller('StudentSchemaCtrl', {
            $scope: scope,
            $routeParams: routeParams,
            schemaService: schemaService
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.schema).toBe(mockSchema);
    });
});
