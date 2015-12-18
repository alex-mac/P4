angular.module('GardenCtrls', ['GardenServices', 'ngAnimate', 'ui.bootstrap'])
.controller('HomeCtrl', ['$scope', function ($scope, Garden) {

}])
.controller('GardenCtrl', ['$scope', 'Auth', 'GardenFactory', 'UserFactory', function($scope, Auth, GardenFactory, UserFactory) {
  $scope.gardens = [];
  user_id = window.localStorage["user.id"]

  GardenFactory.query(function success(data) {
    $scope.gardens = data;
    // data.forEach(function (obj) {
    //   UserFactory.get({_id: obj._id}, function success(data) {
    //     console.log(data);
    //     obj.user_name = data.name;
    //   }, function error() {

    //   });
    // });
  }, function error(data) {
    console.log(data)
  });
}])
.controller('ShowCtrl', ['$scope', '$location', '$routeParams', 'GardenFactory', 'DataFactory', function($scope, $location, $routeParams, GardenFactory, DataFactory) {
  $scope.garden = {};
  $scope.showData = false;

  GardenFactory.get({id: $routeParams.id}, function success(data) {
    $scope.garden = data;
    user_id = window.localStorage["user.id"]
    if ($scope.garden.user_id == user_id) {
        $scope.showData = true;
    };

    getData($scope.garden._id);

  }, function error(data) {
    console.log(data);
  });
    
  var getData = function (query) {

      DataFactory.query({garden_id: query}, function success(data) {
      
      $scope.sunData = [];
      data.forEach(function (obj) {
        $scope.sunData.push(obj.data.sun);
      });

      $scope.waterData = [];
      data.forEach(function (obj) {
        $scope.waterData.push(obj.data.water);
      });

      $scope.soilData = [];
      data.forEach(function (obj) {
        $scope.soilData.push(obj.data.soil);
      });

      $scope.tempData = [];
      data.forEach(function (obj) {
        $scope.tempData.push(obj.data.temp);
      });

      $scope.loaded = true;

    }, function error(data) {
      res.send(data);
    })
  };

  // to delete a garden that a user has
  $scope.deleteGarden = function() {
      GardenFactory.delete({id: $routeParams.id}, function success(data) {
      console.log("scope", $scope.garden._id);
      console.log("routeParams", $routeParams.id);
      console.log("data", data);
      $location.path('/gardens');

    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('NewCtrl', ['$scope', '$location', 'GardenFactory', function($scope, $location, GardenFactory) {
  
  user_id = window.localStorage["user.id"];
  $scope.garden = {
    name: '',
    user_id: user_id
  };

  $scope.createGarden = function() {
    GardenFactory.save($scope.garden, function success(data) {
      $location.path('/gardens');
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
    location.path('/');
    // $scope.recipes = null;
    // $location.path('/');
  };
}])
.controller("LoginCtrl", [
  '$scope',
  '$http',
  '$location',
  "Auth",
  '$uibModalInstance',
  function ($scope, $http, $location, Auth, $uibModalInstance) {
    $scope.login = true;
    $scope.user = {
      email: "",
      password: ""
    }

    $scope.actionName = 'Login';
    $scope.userAction = function () {
      $http.post("/api/auth", $scope.user).then(function success(res) {
        Auth.saveToken(res.data.token, res.data.user);
        console.log(res.data.user.id)
        $location.path('/gardens');
        $uibModalInstance.dismiss('close');//closes modal
      }, function error(res) {
        console.log(res.data);
      });
    }

    $scope.redirect = function() {
      $location.path('/signup');
      $uibModalInstance.dismiss('close');//closes modal
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
          console.log ("api/users was a success");
          console.log(res)
          $http.post('/api/auth', $scope.user).then(function success(res) {
            Auth.saveToken(res.data.token, res.data.user);
            console.log("login successful")
            $location.path('/gardens');
          }, function error(res) {
            console.log("Error 1");
            console.log(res.data);
          })
        }, function error(res) {
          console.log("Error 2");
          console.log(res.data);
        });
      }
    }
  ])
.controller('BootstrapCtrl', ['$scope', '$uibModal', function($scope, $uibModal) {
  $scope.navCollapsed = true;

  $scope.open = function() {
    var modal = $uibModal.open({
      animation: true,
      templateUrl: '/app/views/login.html',
      controller: 'LoginCtrl'
    });    
  };
}]);