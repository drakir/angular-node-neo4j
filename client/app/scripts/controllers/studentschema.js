'use strict';

angular.module('clientApp')
    .controller('StudentSchemaCtrl', function ($scope, $routeParams, schemaService) {
        $scope.schema = schemaService.getSchema($routeParams.schemaId);
    });
