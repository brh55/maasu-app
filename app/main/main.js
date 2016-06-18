'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/list');
  $stateProvider
    .state('main.home', {
      url: '/',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/home.html'
        }
      }
    })
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
    })
      .state('main.list', {
        url: '/list',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list-detail.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.debug', {
        url: '/debug',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/debug.html',
            controller: 'DebugCtrl as ctrl'
          }
        }
      })
      // Speakers
      // Speaker 1
      .state('main.speakers.1', {
        url: '/speakers/1',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/speakers/speaker1.html'
          }
        }
      })
      .state('main.speakers.2', {
        url: '/speakers/2',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/speakers/speaker2.html'
          }
        }
      });
});
