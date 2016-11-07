'use strict';
angular.module('main')
.controller('DialoguesCtrl', function (AuthService, $state, $scope, $firebaseArray) {
  var vm = this;
  $scope.authenticated = false;
  $scope.accepted = false;

  vm.acceptTerms = function acceptTerms () {
    $scope.accepted = true;
  };

  vm.loginWithFacebook = function loginWithFacebook () {
    $scope.loading = true;
    var provider = new firebase.auth.FacebookAuthProvider();
    AuthService.signInWithPopup(provider)
      .then(function (authData) {
        vm.user = authData.user;
        $scope.error = false;
        $scope.loading = true;
        $scope.authenticated = true;
        $state.reload();
      })
      .catch(function () {
        $scope.loading = false;
        $scope.error = true;
      });
  };

  var messagesRef = firebase.database().ref('messages'); // assume value here is { foo: "bar" }
  var query = messagesRef.limitToLast(34);
  var messages = $firebaseArray(query);
  $scope.messages = messages;

  vm.submit = function submitMessage () {
    var dateTime = Date.now();
    var timestamp = Math.floor(dateTime / 1000);
    $scope.messages.$add({
      name: vm.user.displayName,
      text: vm.comment,
      photoUrl: vm.user.photoURL,
      timeStamp: timestamp
    }).then(function () {
      vm.comment = '';
    });
  };

  $scope.charLeft = 150;
  $scope.$watch(
    function watchCommentChanges () {
      return (vm.comment);
    },
    function updateChars (newValue) {
      if (newValue) {
        $scope.charLeft = 150 - newValue.length;
      }
    }
  );

  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.loading = true;
  });

  $scope.$on('$ionicView.afterEnter', function () {
    $scope.loading = false;
  });
});
