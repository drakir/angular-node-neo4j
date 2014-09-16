'use strict';

describe('Service: studentFactory', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var studentFactory;
  beforeEach(inject(function (_studentFactory_) {
    studentFactory = _studentFactory_;
  }));

  it('should do something', function () {
    expect(!!studentFactory).toBe(true);
  });

});
