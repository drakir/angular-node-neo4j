'use strict';

angular.module('clientApp')
    .controller('HeaderCtrl', function ($scope, $rootScope, $location) {

        $rootScope.$on('teacher', function(event, value) {
            $scope.teacherId = value.id;
            $scope.visibleMenu = true;
        });

        $scope.isActive = function(path) {
            return $location.path().indexOf(path) !== -1;
        };

    });
