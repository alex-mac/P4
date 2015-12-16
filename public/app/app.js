var app = angular.module('GardenApp', ['ngRoute', 'GardenCtrls', 'GardenServices', 'd3', 'graphView', 'onScroll']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'app/views/index.html',
    controller: 'BootstrapCtrl'
  }).when('/gardens', {
    templateUrl: 'app/views/gardensAll.html',
    controller: 'GardenCtrl'
  })
  .when('/gardens/new', {
    templateUrl: 'app/views/gardenNew.html',
    controller: 'NewCtrl'
  })
  .when('/gardens/:id', {
    templateUrl: 'app/views/gardenShow.html',
    controller: 'ShowCtrl'
  })
  .when('/login', {
    templateUrl: '/app/views/login.html',
    controller: 'LoginCtrl'
  })
  .when('/signup', {
    templateUrl: '/app/views/signup.html',
    controller: 'SignupCtrl'
  })
  .otherwise({
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}])
.run(['$rootScope', 'Auth', function ($rootScope, Auth) {
  $rootScope.isLoggedIn = function () {
    return Auth.isLoggedIn.apply(Auth);
  };
}]);