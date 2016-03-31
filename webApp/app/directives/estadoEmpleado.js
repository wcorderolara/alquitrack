alquitrackApp.directive('estadoEmpleado', function(){
	return {
		restrict: 'EA',
		controller: 'empleadoController',
		scope:{
			estadoInfo: '=estado'
		},
		templateUrl: 'views/partials/estadoEmpleado.html'
	}
});