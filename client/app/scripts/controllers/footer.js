'use strict';

angular.module('clientApp')
    .controller('FooterCtrl', function ($scope, $rootScope) {

        $rootScope.$on('footerName', function(event, value) {
            $scope.footerName = value;
        });
    });
