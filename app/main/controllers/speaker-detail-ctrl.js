'use strict';
angular.module('main')
.controller('SpeakerDetailCtrl', function (contentful, SpeakerService, $stateParams, $state) {
  var vm = this;
  vm.current = SpeakerService.get()
  if (vm.current.length === 0) $state.go('main.speakers');
});
