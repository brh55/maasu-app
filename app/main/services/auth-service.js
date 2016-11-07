'use strict';
angular.module('main')
.factory('AuthService', function (rootRef, $firebaseAuth) {
  return $firebaseAuth(rootRef);
});
