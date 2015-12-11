angular.module('GardenCtrls', ['GardenServices'])
.controller('HomeCtrl', ['$scope', function ($scope, Garden) {

}])
.controller('GardenCtrl', ['$scope', 'GardenFactory', function($scope, GardenFactory) {
  $scope.gardens = [];

  GardenFactory.query(function success(data) {
    $scope.gardens = data;
  }, function error(data) {
    console.log(data)
  });

  $scope.deleteGarden = function(id, gardenIdx) {
    GardenFactory.delete({id: id}, function success(data) {
      $scope.gardens.splice(gardenIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('ShowCtrl', ['$scope', '$routeParams', 'GardenFactory', function($scope, $routeParams, GardenFactory) {
  $scope.garden = {};

  GardenFactory.get({id: $routeParams.id}, function success(data) {
    $scope.garden = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NewCtrl', ['$scope', '$location', 'GardenFactory', function($scope, $location, GardenFactory) {
  $scope.garden = {
    name: ''
  };

  $scope.createGarden = function() {
    GardenFactory.save($scope.garden, function success(data) {
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('NavCtrl', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
  $scope.logout = function () {
    Auth.removeToken();
    location.reload();
    // $scope.recipes = null;
    // $location.path('/');

  };
}])
.controller("LoginCtrl", [
  '$scope',
  '$http',
  '$location',
  "Auth",
  function ($scope, $http, $location, Auth) {
    $scope.login = true;
    $scope.user = {
      email: "",
      password: ""
    }

    $scope.actionName = 'Login';
    $scope.userAction = function () {
      $http.post("/api/auth", $scope.user).then(function success(res) {
        Auth.saveToken(res.data.token);
        $location.path('/');
      }, function error(res) {
        console.log(res.data);
      });
    }
  }])

  .controller('SignupCtrl', [
    '$scope',
    '$http',
    '$location',
    'Auth',
    function ($scope, $http, $location, Auth) {
      
      $scope.login = false;
      $scope.user = {
        name: "",
        email: "",
        password: ""
      }

      $scope.actionName = 'Signup'

      $scope.userAction = function () {
        $http.post("/api/users", $scope.user).then(function success(res) {
          $http.post('api/auth', $scope.user).then(function success(res) {
            Auth.saveToken(res.data.token);
            $location.path('/');
          }, function error(res) {
            console.log(res.data);
          })
        }, function error() {
          console.log(res.data);
        });
      }
    }
  ]);