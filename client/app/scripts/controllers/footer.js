'use strict';

angular.module('clientApp')
    .controller('FooterCtrl', function ($scope, $rootScope) {

        $rootScope.$on('student', function(event, value) {
            $scope.footerName = value.name;
        });

        $rootScope.$on('teacher', function(event, value) {
            $scope.footerName = value.name;
        });
    });
