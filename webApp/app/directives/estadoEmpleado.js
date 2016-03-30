angular.module('alquitrackApp')
	.directive('estadoEmpleado', estadoEmpleado);

function estadoEmpleado(){
	return {
		restrict: 'EA',
		scope: {
			thisEstado: '=estado'
		},
		templateurl: 'views/partials/estadoEmpleado.html'
	}
}