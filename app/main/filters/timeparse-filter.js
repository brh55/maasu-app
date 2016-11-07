'use strict';
angular.module('main')

.filter('timeParse', function (TimeService) {
  return function (input) {
    if (input) { return TimeService.parse(input); }
  };
})

.filter('toDate', function () {
  return function (input) {
    return moment(input * 1000).format('MM/DD hh:mm:ss A');
  };
});
