'use strict';
angular.module('main')
.factory('MapsService', function () {
  return {
    data: [],
    setMaps: function (data) {
      this.data.length = 0;
      this.data = data;
    },
    getMaps: function () {
      return this.data;
    }
  };
});
