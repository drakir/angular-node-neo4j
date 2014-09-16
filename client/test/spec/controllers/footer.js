'use strict';

describe('Controller: FooterCtrl', function () {

    // load the controller's module
    beforeEach(module('clientApp'));

    var FooterCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        FooterCtrl = $controller('FooterCtrl', {
            $scope: scope
        });

        $rootScope.$broadcast('footerName', 'Adam');
    }));

    it('should set footerName on event', function () {
        expect(scope.footerName).toBe('Adam');
    });
});
