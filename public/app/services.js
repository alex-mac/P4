var TOKEN_STORAGE = 'gardens-token';

angular.module('GardenServices', ['ngResource'])
.factory('GardenFactory', ['$resource', function($resource) {
  return $resource('http://localhost:3000/api/gardens/:id');
}])
.factory('Auth', ["$window", function($window){
    return {
        saveToken: function(token){
            $window.localStorage[TOKEN_STORAGE] = token;
        },
        getToken: function () {
        	return $window.localStorage[TOKEN_STORAGE];
        },
        removeToken: function () {
        	$window.localStorage.removeItem(TOKEN_STORAGE);
        },
        isLoggedIn: function () {
        	var token = this.getToken();
        	return token ? true : false;
        }
    };
}])
.factory('AuthInterceptor', ['Auth', function (Auth) {
	return {
		request: function (config) {
			var token = Auth.getToken();
			if (token) {
				config.headers.Authorization = 'Bearer '+ token;
			}
			return config;
		}
	}
}]);