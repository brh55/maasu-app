'use strict';
angular.module('main')

.controller('workshopCtrl', function (contentful) {
  var searchParams = "content_type=workshops";

  var vm = this;

  vm.entries = [];

  contentful
    .entries(searchParams)
    .then(function (response) {
      vm.entries = response.data.items;
      console.log(vm.entries)
    });
});
