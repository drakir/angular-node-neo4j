'use strict';

angular.module('clientApp')
  .factory('socket', function (socketFactory) {
    return socketFactory();
  });
