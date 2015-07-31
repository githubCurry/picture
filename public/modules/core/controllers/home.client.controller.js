'use strict';


angular.module('core').controller('HomeController', ['$scope','Articles', 'Authentication',
	function($scope,Articles, Authentication) {
		$scope.authentication = Authentication;
		$scope.articles = Articles.query();
		
	}
]);