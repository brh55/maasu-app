'use strict';
angular.module('main')
.constant('FirebaseUrl', 'https://maasu-ls.firebaseio.com/')
.service('rootRef', ['FirebaseUrl', Firebase])
