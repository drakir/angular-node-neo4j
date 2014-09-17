'use strict';

angular.module('clientApp')
    .controller('DatePickerCtrl', function ($scope) {

        $scope.selectedDate = new Date();

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.minDate = new Date();
        $scope.maxDate = moment().add(3, 'months').toDate();

        $scope.format = 'yyyy-MM-dd';

        $scope.disableWeekends = function (date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.datePickerOpened = true;
        };
    });
