angular.module('GardenCtrls', ['GardenServices', 'ngAnimate', 'ui.bootstrap'])
.controller('HomeCtrl', ['$scope', function ($scope, Garden) {

}])
.controller('GardenCtrl', ['$scope', 'Auth', 'GardenFactory', function($scope, Auth, GardenFactory) {
  $scope.gardens = [];
  user_id = window.localStorage["user.id"]
  if (user_id) {
    GardenFactory.query(function success(data) {
      $scope.gardens = data.data;

    }, function error(data) {
      console.log(data)
    });
  }

  // to delete a garden that a user has
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
  $scope.addGarden = function() {
    location.path('/gardens/new');
  }

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
        console.log(res.data.user.id)
        $location.path('/gardens');
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

      $scope.userAction = function () {
        $http.post("/api/users", $scope.user).then(function success(res) {
          $http.post('api/auth', $scope.user).then(function success(res) {
            Auth.saveToken(res.data.token, res.data.user);
            $location.path('/gardens');
          }, function error(res) {
            console.log(res.data);
          })
        }, function error() {
          console.log(res.data);
        });
      }
    }
  ])
.controller('BootstrapCtrl', ['$scope', '$uibModal', function($scope, $uibModal) {
  $scope.navCollapsed = true;

  $scope.open = function() {
    console.log('modal!');
    var modal = $uibModal.open({
      animation: true,
      templateUrl: '/app/views/login.html',
      controller: 'LoginCtrl'
    });    
  };
}])
.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
  
  $scope.message = "I'm working";

  $scope.close = function() {
    $uibModalInstance.dismiss('close');
  };

  // $scope.login = function() {
  //   $uibModalInstance.close($scope.message);
  // }
}]);