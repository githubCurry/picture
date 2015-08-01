angular.module('articles').directive('choose', [ function(){
	return {
		restrict: 'AE',
		link: function($scope, iElm, iAttrs, controller) {
			iElm.on("change",function(ev){
				$scope.uploadFile(ev,this);
			})
		}
	};
}]).directive('trigger', [ function(){
	return {
		restrict: 'AE',
		link: function($scope, iElm, iAttrs, controller) {
			$scope.$watch('sub', function(newValue, oldValue, scope) {
				if(newValue == true){
					$(iElm).trigger("click")
				}
				
			});
		}
	};
}]);

