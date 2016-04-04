alquitrackApp.directive('estadoPedido', function(){
	return {
		restrict: 'EA',
		controller: 'pedidoController',
		scope:{
			estadoInfo: '=estado'
		},
		templateUrl: 'views/partials/estadoPedido.html'
	}
});