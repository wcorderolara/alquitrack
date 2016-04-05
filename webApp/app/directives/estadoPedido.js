alquitrackApp.directive('estadoPedido', function(){
	return {
		restrict: 'EA',
		controller: 'verPedidosController',
		scope:{
			estadoInfo: '=estado'
		},
		templateUrl: 'views/partials/estadoPedido.html'
	}
});