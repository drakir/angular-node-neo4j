'use strict';

angular.module('clientApp')
    .controller('EditibleTextCellCtrl', function ($scope) {

        function initCell() {
            $scope.model = {};
            $scope.model.value = $scope.text;
        }

        initCell();

        $scope.save = function ($event) {
            $scope.callback({value: $scope.model.value});
            $scope.edit = false;
            $event.stopPropagation();
        };

        $scope.cancel = function ($event) {
            initCell();
            $scope.edit = false;
            $event.stopPropagation();
        };

        $scope.editMode = function () {
            $scope.edit = true;
        };
    });
