'use strict';
angular.module('main')
.controller('AgendaCtrl', function (contentful) {
  var searchParams = 'content_type=agenda&include=2';

  var vm = this;

  vm.detail = '';
  vm.friday = {};
  vm.saturday = {};

  contentful
    .entries(searchParams)
    .then(function (response) {
      vm.friday = response.data.items[0].fields.friday;
      vm.saturday = response.data.items[0].fields.saturday;
      console.log(vm.saturday)
    });
});
