'use strict';

describe('Controller: StudentSchemaCtrl', function () {

    // load the controller's module
    beforeEach(module('clientApp'));

    var StudentSchemaCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        spyOn(scope, '$emit');

        var mockRouteParams = {
            schemaId: '1',
            studentId: '2'
        };

        var mockStudentService = {
            getStudent: function (studentId, successCallback) {
                successCallback({id: studentId, name: 'Julia'});
            }
        };

        StudentSchemaCtrl = $controller('StudentSchemaCtrl', {
            $scope: scope,
            $routeParams: mockRouteParams,
            studentService: mockStudentService

        });
    }));

    it('should attach routeParams.schemaID to scope', function () {
        expect(scope.schemaId).toBe('1');
    });

    it('should attach routeParams.studentId to scope', function () {
        expect(scope.studentId).toBe('2');
    });

    it('should emit an event when a student has been loaded', function () {
        expect(scope.$emit).toHaveBeenCalledWith('footerName', 'Julia');
    });

});
