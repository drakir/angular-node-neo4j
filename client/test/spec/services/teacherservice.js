'use strict';

describe('Service: teacherService', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var teacherService;
  beforeEach(inject(function (_teacherService_) {
    teacherService = _teacherService_;
  }));

  it('should do something', function () {
    expect(!!teacherService).toBe(true);
  });

});
