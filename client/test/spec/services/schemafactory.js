'use strict';

describe('Service: schemaFactory', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var schemaFactory;
  beforeEach(inject(function (_schemaFactory_) {
    schemaFactory = _schemaFactory_;
  }));

  it('should do something', function () {
    expect(!!schemaFactory).toBe(true);
  });

});
