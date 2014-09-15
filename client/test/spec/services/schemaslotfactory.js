'use strict';

describe('Service: schemaSlotFactory', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var schemaSlotFactory;
  beforeEach(inject(function (_schemaSlotFactory_) {
    schemaSlotFactory = _schemaSlotFactory_;
  }));

  it('should do something', function () {
    expect(!!schemaSlotFactory).toBe(true);
  });

});
