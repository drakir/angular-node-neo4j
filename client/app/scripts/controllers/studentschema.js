'use strict';

angular.module('clientApp')
    .controller('StudentSchemaCtrl', function ($scope, $routeParams, schemaService, schemaSlotsPagingService) {
        schemaService.getSchema($routeParams.schemaId, function (schema) {
            $scope.schema = schema;
        });

        schemaSlotsPagingService.loadSchemaSlots($routeParams.schemaId, function(schemaSlots) {
            $scope.filteredSchemaSlots = schemaSlots;
        });

    });
