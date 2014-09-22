'use strict';

describe('Controller: TeacherSchemaCtrl', function () {

    // load the controller's module
    beforeEach(module('clientApp'));

    var TeacherschemaCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        spyOn(scope, '$emit');
        var mockRouteParams = {
            schemaId: '1',
            teacherId: 'f3a3c910-33fc-11e4-be18-af9ab5854515'
        };

        var mockTeacherService = {
            getTeacher: function (teacherId, successCallback) {
                var teacher = {id: teacherId, name: 'Rikard'};
                successCallback(teacher);
            }
        };

        TeacherschemaCtrl = $controller('TeacherSchemaCtrl', {
            $scope: scope,
            $routeParams: mockRouteParams,
            teacherService: mockTeacherService
        });
    }));

    it('should attach routeParams.schemaId to scope', function () {
        expect(scope.schemaId).toBe('1');
    });

    it('should emit teacher name on load', function() {
        var teacher = {id: 'f3a3c910-33fc-11e4-be18-af9ab5854515', name: 'Rikard'};
        expect(scope.$emit).toHaveBeenCalledWith('teacher', teacher);
    });

});
