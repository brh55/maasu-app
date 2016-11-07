'use strict';
/* global _, moment */
angular.module('main')
.controller('HomeCtrl', function (contentful, $interval, $firebaseArray, $scope, FirebaseInit) {
  var searchParams = 'content_type=agenda&include=2';

  var vm = this;

  vm.detail = '';
  vm.friday = {};
  vm.saturday = {};

  function createUnixTimeStamp (data) {
    var dateString = (data.length > 1) ? '2016-11-12 ' : '2016-11-11 ';
    var timeStamp = [];
    _.forEach(data, function (confEvent) {
      if (confEvent.startTime) {
        var currentDateString = dateString + confEvent.startTime;
        var timeFormat = (confEvent.startTime.includes('PM')) ?
            'YYYY-MM-DD hh:mm A' :
            'YYYY-MM-DD hh:mm a';
        timeStamp.push(moment(currentDateString, timeFormat).unix());
      }
    });
    return timeStamp;
  }

  function findUpcomingEventIndex (timeCollection) {
    var upcomingEvents = _
                          .chain(timeCollection)
                          .filter(function (timeStamp) {
                            var currentUtc = moment().unix();
                            // return only times that are in the future
                            return (currentUtc < timeStamp);
                          })
                          .value();
    return timeCollection.indexOf(upcomingEvents[0]);
  }

  function getTimeDifference (greaterTime) {
    return Math.round(Math.abs(greaterTime - moment().unix()) / 60);
  }

  contentful
    .entries('content_type=home&include=3')
    .then(function (response) {
      vm.overrideCards = (response.data.items.length > 0) ? response.data.items[0].fields.cards : [];
    });

  contentful
    .entries(searchParams)
    .then(function (response) {
      var fridayEvents = response.data.items[0].fields.friday;
      var fridayTimes = _
        .chain(fridayEvents)
        .map(createUnixTimeStamp)
        .flatten()
        .value();

      var saturdayEvents = response.data.items[0].fields.saturday;
      var saturdayTimes = _
        .chain(saturdayEvents)
        .map(createUnixTimeStamp)
        .flatten()
        .value();

      var currentIndex = '';
      // Not the best, but it provides a Static Fill depending on the day
      if (moment().isAfter('2016-11-11', 'day')) {
        currentIndex = findUpcomingEventIndex(saturdayTimes);
        vm.upcomingEvent = saturdayEvents[currentIndex];
        vm.remainingTime = getTimeDifference(saturdayTimes[currentIndex]);
      } else {
        currentIndex = findUpcomingEventIndex(fridayTimes);
        vm.upcomingEvent = fridayEvents[currentIndex];
        vm.remainingTime = getTimeDifference(fridayTimes[currentIndex]);
      }

      // Update the timer every minute
      var updateTime = $interval(
                        function () {
                          if (vm.remainingTime > 0) {
                            vm.remainingTime -= 1;
                          } else {
                            vm.remainingTime = 'Now';
                            $interval.cancel(updateTime);
                          }
                        }, 60000);
    });

  var firebase = FirebaseInit;
  var messagesRef = firebase.database().ref('messages'); // assume value here is { foo: "bar" }
  var query = messagesRef.limitToLast(1);
  var messages = $firebaseArray(query);
  $scope.dialogues = messages;
});
