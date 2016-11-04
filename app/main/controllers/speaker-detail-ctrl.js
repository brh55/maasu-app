'use strict';
angular.module('main')
.controller('SpeakerDetailCtrl', function (contentful, SpeakerService, $state, $stateParams) {
  var vm = this;
  vm.current = SpeakerService.get();

  // Just a dirty check
  if (!$stateParams.id) {
    $state.go('main.speakers');
  }
});
