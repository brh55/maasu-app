'use strict';
angular.module('main')
.factory('MapsService', function () {
  // this.mapData = [];

  // this.setMaps = function (data) {
  //   this.mapData = data;
  // }

  // this.getMaps = function (data) {
  //   return this.mapData;
  // }

  return {
    data: [],
    setMaps: function (data) {
        this.data.length = 0;
        this.data = data;
    },
    getMaps: function () {
        return this.data;
    }
  }
});
