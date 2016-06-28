'use strict';
angular.module('main')
.service('TimeService', function () {
  this.parse = function (timeString) {
    var weekArray = [
      'SUN',
      'MON',
      'TUE',
      'WED',
      'THU',
      'FRI',
      'SAT'
    ];

    var tempTime = new Date(timeString);
    var tempHours = tempTime.getHours();
    var tempMins = tempTime.getMinutes();
    var parseHours = '';
    var parseMins = '';
    var dayPeriod = '';

    if (tempHours < 12) {
      parseHours = tempHours;
      dayPeriod = 'AM';
    } else {
      parseHours = tempHours - 12;
      dayPeriod = 'PM';
    }

    parseMins = (tempMins < 10) ? tempMins + '0' : tempMins;

    return weekArray[tempTime.getDay()] + ' ' + parseHours + ':' + parseMins + ' ' + dayPeriod;
  };
});
