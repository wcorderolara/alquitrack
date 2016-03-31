alquitrackApp.directive('estadoTractor', function(){
	return {
		restrict: 'EA',
		controller: 'tractorController',
		scope:{
			estadoInfo: '=estado'
		},
		templateUrl: 'views/partials/estadoTractor.html'
	}
});