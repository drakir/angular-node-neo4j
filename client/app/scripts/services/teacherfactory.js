'use strict';

angular.module('clientApp')
    .factory('teacherFactory', function ($resource) {
        return $resource('/api/teachers/:id', {}, {
            allSchemas: {method: 'GET', url: '/api/teachers/:teacherId/schemas/', isArray: true},
            editSchema: {method: 'PUT', url: '/api/teachers/:teacherId/schemas/:schemaId'},
            addSchema: {method: 'POST', url: '/api/teachers/:teacherId/schemas/'},
            deleteSchema: {method: 'DELETE', url: '/api/teachers/:teacherId/schemas/:schemaId'},
            classes: {method: 'GET', url: '/api/teachers/:teacherId/classes', isArray: true}
        });
    });
