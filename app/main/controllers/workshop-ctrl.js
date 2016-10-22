'use strict';
angular.module('main')

.controller('WorkshopCtrl', function (contentful, $stateParams, TimeService) {
  var searchParams = 'content_type=workshops';

  function filterGenre (shopArray, genre) {
    if (genre === 'all') {
      return _(shopArray)
              .sortBy(['unixStamp', 'fields.title'])
              .value();

    } else {
      // Process seperately because sorting is different
      return _(shopArray)
              .chain()
              .filter(function (workshop) {
                return workshop.fields.genre === genre;
              })
              .sortBy(['unixStamp', 'fields.genre', 'fields.title'])
              .value();
    }
  }

  var vm = this;
  vm.state = false;
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

  vm.timeParse = function (timeString) {
    return TimeService.parse(timeString);
  };

  function appendUnixStamp (workshopObject) {
    workshopObject.unixStamp = moment(workshopObject.fields.timeslot).unix();
    return workshopObject;
  }

  contentful
    .entries(searchParams)
    .then(function (response) {
      // add unix stamp for easy sorting
      vm.entries = _.map(response.data.items, appendUnixStamp);
      vm.currentEntries = filterGenre(vm.entries, vm.currentGenre);
    });
});
