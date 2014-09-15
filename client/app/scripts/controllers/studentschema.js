'use strict';

angular.module('clientApp')
    .controller('StudentSchemaCtrl', function ($scope, $routeParams, schemaService) {
        schemaService.getSchema($routeParams.schemaId, function (schema) {
            $scope.schema = schema;
        });
    });
