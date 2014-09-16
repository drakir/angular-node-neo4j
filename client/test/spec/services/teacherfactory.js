'use strict';

describe('Service: teacherFactory', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var teacherFactory;
  beforeEach(inject(function (_teacherFactory_) {
    teacherFactory = _teacherFactory_;
  }));

  it('should do something', function () {
    expect(!!teacherFactory).toBe(true);
  });

});
