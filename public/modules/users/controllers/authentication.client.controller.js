'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;
		$scope.credentials={
			repassword:"",
			password:""
		};
		$scope.notsame = "";
		$scope.$watch("credentials.repassword",function(newValue){
			var repass = $scope.credentials.repassword;
			var pass = $scope.credentials.password
			if (!repass||!pass) {
				return;
			}
			$scope.notsame = true;
			if ($scope.credentials.repassword == $scope.credentials.password) {
				$scope.notsame = false;
			}
			
		})

		if ($scope.authentication.user) $location.path('/');
		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				$scope.authentication.user = response;
				$location.path('/personal/'+response.id);
			}).error(function(response) {
				alert(response);
				console.error(response);
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				Authentication.user(response);
				$location.path('/personal/'+response._id);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
