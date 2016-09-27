// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'onezone-datepicker'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.exames', {
        url: '/exames',
        views: {
            'menuContent': {
                templateUrl: 'templates/exames.html',
                controller: 'ExamesCtrl'
            }
        }
    })

        .state('app.laudoss', {
            url: '/laudoss',
            views: {
                'menuContent': {
                    templateUrl: 'templates/laudos.html',
                    controller: 'LaudosCtrl'
                }
            }
        })

    .state('app.imagens', {
        url: '/imagens',
        views: {
            'menuContent': {
                templateUrl: 'templates/imagens.html'
            }
        }
    })

    .state('app.dashboard', {
        url: '/dashboard',
        views: {
            'menuContent': {
                templateUrl: 'templates/dashboard.html'
            }
        }
    })

    .state('app.laudo', {
        url: '/laudo',
        views: {
            'menuContent': {
                templateUrl: 'templates/laudo.html'
            }
        }
    })

    .state('app.exame', {
        url: '/exame/:exameId/:random',
        views: {
            'menuContent': {
                templateUrl: 'templates/exame.html'
            }

        }
    })

    .state('app.laudar', {
        url: '/laudar/:exameId/:random',
        views: {
            'menuContent': {
                templateUrl: 'templates/laudar.html'
            }

        }
    });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/dashboard');
})

.constant('CONFIGURACOES', {
    baseUrl: '192.168.10.103:8082'
});
