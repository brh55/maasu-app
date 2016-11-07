'use strict';
angular.module('main')
.factory('FirebaseInit', function (firebase) {
  var config = {
    apiKey: 'AIzaSyB7THADoKsIlLQhpgCBBW9i4zbCZkD-hZ4',
    authDomain: 'maasu-ls.firebaseapp.com',
    databaseURL: 'https://maasu-ls.firebaseio.com',
    storageBucket: 'maasu-ls.appspot.com',
    messagingSenderId: '155580124269'
  };
  firebase.initializeApp(config);
  return firebase;
})
.factory('AuthService', function (FirebaseInit) {
  var firebase = FirebaseInit;
  return firebase.auth();
});
