'use strict';
angular.module('main')

.controller('workshopDetailCtrl', function (contentful, $stateParams, TimeService) {
  var searchParams = 'sys.id=' + $stateParams.id;

  var vm = this;

  vm.detail = '';

  contentful
    .entries(searchParams)
    .then(function (response) {
      vm.detail = response.data.items[0].fields;
      console.log(vm.detail);
      vm.detail.timeParse = TimeService.parse(vm.detail.timeslot);
    });
});
