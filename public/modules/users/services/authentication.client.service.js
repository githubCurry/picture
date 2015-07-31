'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window', function($window) {
	var auth = {
		user: $window.user,
		name: $window.name,
		getHash: function(index){
			var result = [];
			var hash = location.hash;
			result = hash.substring(3).split("/");
			return result[index];
		}
	};
	
	return auth;
}]);
