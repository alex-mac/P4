var TOKEN_STORAGE = 'gardens-token';

angular.module('GardenServices', ['ngResource'])
.factory('GardenFactory', ['$resource', function($resource) {
  return $resource('/api/gardens/:id');
}])
.factory('DataFactory', ['$resource', function($resource) {
  return $resource('/api/data/');
}])
.factory('UserFactory', ['$resource', function($resource) {
  return $resource('/api/users/:id', {id:'@id'});
}])
.factory('Auth', ["$window", function($window){
    return {
        saveToken: function(token, user){
            $window.localStorage[TOKEN_STORAGE] = token;
            $window.localStorage["user.id"] = user.id;
        },
        getToken: function () {
        	return $window.localStorage[TOKEN_STORAGE];
        },
        removeToken: function () {
        	$window.localStorage.removeItem(TOKEN_STORAGE);
          $window.localStorage.removeItem("user.id");
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

angular.module('d3', [])
  .factory('d3Service', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
      var d = $q.defer();
      function onScriptLoad() {
        // Load client in the browser
        $rootScope.$apply(function() { d.resolve(window.d3); });
      }
      // Create a script tag with d3 as the source
      // and call our onScriptLoad callback when it
      // has been loaded
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript'; 
      scriptTag.async = true;
      scriptTag.src = 'https://d3js.org/d3.v3.min.js';
      scriptTag.onreadystatechange = function () {
        if (this.readyState == 'complete') onScriptLoad();
      }
      scriptTag.onload = onScriptLoad;
 
      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);
 
      return {
        d3: function() { return d.promise; }
      };
}]);
