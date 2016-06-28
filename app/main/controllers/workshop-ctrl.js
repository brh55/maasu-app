'use strict';
angular.module('main')

.controller('workshopCtrl', function (contentful, $stateParams, TimeService) {
  var searchParams = 'content_type=workshops';

  function filterGenre (shopArray, genre) {
    if (genre === 'all') {
      return shopArray;
    } else {
      return _.filter(shopArray, function (o) { return o.fields.genre === genre; });
    }
  }

  var vm = this;
  vm.entries = [];
  vm.currentEntries = [];
  // All being a default in params
  vm.currentGenre = ($stateParams.genre) ? $stateParams.genre : 'all';

  /**
   * Filter wrapper that updates the angular model
   * @param  {string} genre string genre
   * @return {void}       updates the model to filter view
   */
  vm.filterShops = function (genre) {
    vm.currentGenre = genre;
    vm.currentEntries = filterGenre(vm.entries, vm.currentGenre);
  };

  vm.timeParse = function (timeString) { return TimeService.parse(timeString)};

  contentful
    .entries(searchParams)
    .then(function (response) {
      vm.entries = response.data.items;
      vm.currentEntries = filterGenre(vm.entries, vm.currentGenre);
    });
});
