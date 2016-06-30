'use strict';
angular.module('main')
.controller('CommitteeCtrl', function (contentful) {
  var searchParams = 'content_type=committee&include=2';

  var vm = this;
  vm.data = [];

  contentful
    .entries(searchParams)
    .then(function (response) {
      vm.data = response.data;
      console.log(vm.data);
    });
});
