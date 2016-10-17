'use strict';
angular.module('main')
.controller('HomeCtrl', function (contentful, $interval) {
  var searchParams = 'content_type=agenda&include=2';

  var vm = this;

  vm.detail = '';
  vm.friday = {};
  vm.saturday = {};

  function getUpcoming (data) {
    var currentMinutes = moment().hours() * 60 + moment().minutes();
    _(data).map(function(data) {

    });
  }

  function createUnixTimeStamp (data) {
    var dateString = (data.length > 1) ? '2016-11-12 ' : '2016-11-11 ';
    var timeStamp = [];
    _.forEach(data, function(confEvent) {
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
    return Math.round(Math.abs(greaterTime - moment().unix())/60);
  }

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
      // not the best, but it provides a static fill depending on the day
     if (moment().isAfter('2016-11-11', 'day')) {
        currentIndex = findUpcomingEventIndex(saturdayTimes);
        vm.upcomingEvent = saturdayEvents[currentIndex];
        vm.remainingTime = getTimeDifference(saturdayTimes[currentIndex]);
     } else {
        currentIndex = findUpcomingEventIndex(fridayTimes);
        vm.upcomingEvent = fridayEvents[currentIndex];
        vm.remainingTime = getTimeDifference(fridayTimes[currentIndex]);
     }

     // Reduce the timer every minute
     $interval(
        function () {
          if (vm.remainingTime > 0) {
            vm.remainingTime -= 1
          }
        }, 60000);
    });
});
