'use strict';

describe('Controller: TeacherSchemasCtrl', function () {

    // load the controller's module
    beforeEach(module('clientApp'));

    var TeacherSchemasCtrl,
        scope,
        mockRouteParams,
        mockTeacherService,
        expectedSchemas;

    beforeEach(function () {
        expectedSchemas = [
            {
                id: '1',
                name: 'Höstschema'
            },
            {
                id: '2',
                name: 'Kvartssamtal'
            }
        ];
        mockRouteParams = {teacherId: '666'};
        mockTeacherService = {
            findAllTeacherSchemas: function (teacherId, successCallback) {
                successCallback(expectedSchemas);
            },
            getTeacher: function (teacherId, successCallback) {
                successCallback({id: teacherId, name:'Rikard'});
            }
        };

    });

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        spyOn(scope, '$emit');

        TeacherSchemasCtrl = $controller('TeacherSchemasCtrl', {
            $scope: scope,
            $routeParams: mockRouteParams,
            teacherService: mockTeacherService
        });
    }));

    it('should schemas to scope', function () {
        expect(scope.schemas).toBe(expectedSchemas);
    });

    it('should emit teacher name as footerName', function () {
        var teacher = {id: '666', name: 'Rikard'};
        expect(scope.$emit).toHaveBeenCalledWith('teacher', teacher);
    });
});
