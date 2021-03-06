'use strict';
angular.module('main')

.controller('WorkshopDetailCtrl', function (contentful, $stateParams) {
  var searchParams = 'sys.id=' + $stateParams.id;

  var vm = this;

  vm.detail = '';

  contentful
    .entries(searchParams)
    .then(function (response) {
      vm.detail = response.data.items[0].fields;
    });
});
