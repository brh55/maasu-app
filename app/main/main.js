'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'contentful',
  'ionic-zoom-view',
  'btford.markdown'
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
            templateUrl: 'main/templates/home.html',
            controller: 'HomeCtrl as home'
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

      // COMMITTEE ROUTE
      .state('main.committee', {
        url: '/committee',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/committee/main.html',
            controller: 'CommitteeCtrl as committee'
          }
        }
      })

      // MAP ROUTE
      .state('main.maps', {
        url: '/maps',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/maps/main.html',
            controller: 'MapsCtrl as maps'
          }
        }
      })
      .state('main.mapDetail', {
        url: '/maps/:id',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/maps/detail.html',
            controller: 'MapsDetailCtrl as map'
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

      // AGENDA ROUTE
      .state('main.agenda', {
        url: '/agenda',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/agenda/main.html',
            controller: 'AgendaCtrl as agenda'
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
            controller: 'WorkshopCtrl as workshop'
          }
        }
      })
      .state('main.workshopDetail', {
        url: '/workshop/:id',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/workshop/detail.html',
            controller: 'WorkshopDetailCtrl as workshop'
          }
        }
      })
      .state('main.speakers', {
        url: '/speakers',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/speakers/main.html',
            controller: 'SpeakersCtrl as speakers'
          }
        }
      })
      .state('main.speakerDetails', {
        url: '/speakers/detail/:id',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/speakers/detail.html',
            controller: 'SpeakerDetailCtrl as speaker'
          }
        }
      });
});
