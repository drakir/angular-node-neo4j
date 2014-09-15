'use strict';

describe('Service: schemaService', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var schemaService;
  beforeEach(inject(function (_schemaService_) {
    schemaService = _schemaService_;
  }));

  it('should do something', function () {
    expect(!!schemaService).toBe(true);
  });

});
