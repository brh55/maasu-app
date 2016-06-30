'use strict';
angular.module('main')
.controller('MapsDetailCtrl', function (contentful, MapsService, $stateParams) {
  var vm = this;
  var mapData = MapsService.getMaps();

  if (mapData.length > 0) {
    var currentMap = _.filter(mapData, function (o) {
      return o.sys.id === $stateParams.id;
    });

    vm.data = currentMap[0];
  } else {
    // In the event a user lands on URL and doesn't have cache Map data
    var searchParams = 'sys.id=' + $stateParams.id;

    contentful
      .entries(searchParams)
      .then(function (response) {
        vm.data = response.data.items[0];
      });
  }
});
