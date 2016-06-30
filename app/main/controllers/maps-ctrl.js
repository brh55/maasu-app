'use strict';
angular.module('main')
.controller('MapsCtrl', function (contentful, MapsService) {
  var searchParams = 'content_type=maps&include=2';

  var vm = this;
  vm.data = [];

  contentful
    .entries(searchParams)
    .then(function (response) {
      MapsService.setMaps(response.data.items);
      vm.data = MapsService.getMaps();
    });
});
