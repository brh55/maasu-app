'use strict';
angular.module('main')

.controller('WorkshopCtrl', function (contentful, $stateParams, TimeService, $scope) {
  var searchParams = 'content_type=workshops';

  var filterList = {};
  function filterGenre (shopArray, genre) {
    if (filterList[genre]) {
      return filterList[genre];
    }

    if (genre === 'all') {
      var allArray = _(shopArray)
                      .sortBy(['fields.title'])
                      .value();
      filterList[genre] = allArray;
      return allArray;
    } else {
      // Process seperately because sorting is different
      var filterArray =  _(shopArray)
                          .chain()
                          .filter(function (workshop) {
                            return workshop.fields.genre === genre;
                          })
                          .sortBy(['fields.title'])
                          .value();
      filterList[genre] = filterArray;
      return filterArray;
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
    $scope.loading = true;
    vm.currentGenre = genre;
    $scope.currentEntries = filterGenre(vm.entries, vm.currentGenre);
    $scope.loading = false;
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
      $scope.currentEntries = filterGenre(vm.entries, vm.currentGenre);
    });

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.loading = true;
  });

  $scope.$on('$ionicView.afterEnter', function () {
    $scope.loading = false;
  });
});
