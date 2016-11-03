'use strict';
angular.module('main')
.controller('SpeakersCtrl', function (contentful, $state, SpeakerService) {
  var searchParams = 'content_type=speakers&include=2';

  var vm = this;
  vm.list = [];

  vm.loadSpeaker = function (speakerData) {
    SpeakerService.set(speakerData);
    $state.go('main.speakerDetails');
  }

  contentful
    .entries(searchParams)
    .then(function (response) {
      vm.list = response.data.items;
      console.log(vm.list)
    });
});
