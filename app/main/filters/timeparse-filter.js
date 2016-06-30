'use strict';
angular.module('main')

.filter('timeParse', function (TimeService) {
  return function (input) {
    if (input) { return TimeService.parse(input); }
  };
});
