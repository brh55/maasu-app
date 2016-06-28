'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'contentful'
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider, contentfulProvider) {
  contentfulProvider.setOptions({
    space: 'fsxwgabotp2c',
    accessToken: '7d9bcb591d105c142ae6cb874e9913e27cc84e5c7f027b6e24d2d210d1385841'
  });
  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
    })
      .state('main.home', {
        url: '/',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/home.html'
          }
        }
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
      .state('main.agenda', {
        url: '/agenda',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/agenda/main.html'
          }
        }
      })
      .state('main.workshop', {
        url: '/workshop',
        params: {
          genre: null
        },
        views: {
          'pageContent': {
            templateUrl: 'main/templates/workshop/main.html',
            controller: 'workshopCtrl as workshop'
          }
        }
      })
      .state('main.workshopDetail', {
        url: '/workshop/:id',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/workshop/detail.html',
            controller: 'workshopDetailCtrl as workshop'
          }
        }
      });
});
