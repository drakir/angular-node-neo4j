'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:editibleTextCell
 * @description
 * # editibleTextCell
 */
angular.module('clientApp')
    .directive('editibleTextCell', function () {
        return {
            controller: 'EditibleTextCellCtrl',
            templateUrl: 'views/editabletextcell.html',
            restrict: 'A',
            scope: {
                text: '=',
                edit: '=',
                callback: '&save'
            }
        };
    });
