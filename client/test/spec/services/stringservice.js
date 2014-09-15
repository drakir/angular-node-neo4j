'use strict';

describe('Service: stringService', function () {

    // load the service's module
    beforeEach(module('clientApp'));

    // instantiate service
    var stringService;
    beforeEach(inject(function (_stringService_) {
        stringService = _stringService_;
    }));

    it('should capitalize first letter', function () {
        expect(stringService.capitaliseFirstLetter('måndag')).toBe('Måndag');
    });

});
