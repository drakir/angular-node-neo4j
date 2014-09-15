'use strict';

describe('Service: dateTimeService', function () {

    // load the service's module
    beforeEach(module('clientApp'));

    // instantiate service
    var dateTimeService;
    beforeEach(inject(function (_dateTimeService_) {
        dateTimeService = _dateTimeService_;
    }));

    it('should be today', function () {
        expect(dateTimeService.isToday(new Date())).toBe(true);
    });

    it('should not be today', function () {
        expect(dateTimeService.isToday(moment().add(-1, 'days'))).toBe(false);
    });

    it('should format date to dddd D/M and capitalize first letter', function () {
        expect(dateTimeService.formatDate(moment('2014-09-15').toDate())).toBe('Måndag 15/9');
    });

    it('should format time to HH:mm', function () {
        var dateTime = moment('2014-09-15 10:15:00').toDate();
        expect(dateTimeService.formatTime(dateTime)).toBe('10:15');
    });

    it('should format date into a number representing day in year', function () {
        expect(dateTimeService.dayInYear(moment('2014-01-01').toDate())).toBe(1);
        expect(dateTimeService.dayInYear(moment('2014-09-15').toDate())).toBe(258);
        expect(dateTimeService.dayInYear(moment('2014-12-31').toDate())).toBe(365);
    });

});
