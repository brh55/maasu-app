'use strict';
angular.module('main')
.controller('CommitteeCtrl', function (contentful) {
  var searchParams = 'content_type=committee&include=2';

  var vm = this;
  vm.list = [];

  contentful
    .entries(searchParams)
    .then(function (response) {
      vm.list = response.data.items[0].fields.committeeList;
    });
});
