'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('MainCtrl', function ($scope, socket) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        socket.emit('eventFromClient', {msg: 'Hello World!'});

        socket.on('eventFromServer', function (data) {
            console.log('eventFromServer, data: ' + data);
        });
    });
