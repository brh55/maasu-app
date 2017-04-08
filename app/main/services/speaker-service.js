'use strict';
angular.module('main')
.factory('SpeakerService', function () {
  return {
    data: [],
    set: function (data) {
      this.data.length = 0;
      this.data = data;
    },
    get: function () {
      return this.data;
    }
  };
});
