alquitrackApp.controller('verPerdidosController', function($scope, $window, $location,
											    pedidoService,ShareData, blockUI, Notification,
											    $modal){

	// Servicios relacionados
	var service = pedidoService;
	var factory = ShareData;
	var info = factory.value;

	$scope.listItems = [];

	$scope.nuevoRegistro = function(){
		$window.location = '#/app/pedidos';
	}

	$scope.setItemsPerPage = function(num) {
		$scope.itemsPerPage = num;
		$scope.currentPage = 1; //reset to first paghe
	}

	$scope.getPedidos = function(){

		if(info.rol == 'Administrador'){	
			service.getRegistros().then(
				function (data){
					$scope.listItems = data.data;
					$scope.totalItems = $scope.listItems.length;
				}
			)
		}else if (info.rol == 'Supervisor'){
			service.getRegistrosBySede(info.SedeId).then(
				function (data){
					$scope.listItems = data.data;
					$scope.totalItems = $scope.listItems.length;
				}
			)
		}else{
			service.getRegistrosByEmpleado(info.empleado).then(
				function (data){
					$scope.listItems = data.data;
					$scope.totalItems = $scope.listItems.length;
				}
			)
		}
	}		

	$scope.getPedidos();

	// Funciones para la pantalla principal del Pedido

	$scope.verDetallePedido = function(item){

		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl:'views/modals/catalogoTractores.html',
			controller: 'detallePedidoController',
			size: 'lg',
			resolve: {
				model: function(){
					return item;
				},
				objInfo: function(){
					return info
				}
			}
		});

	}

})

alquitrackApp.controller('detallePedidoController', function ($scope, $modalInstance, model, objInfo,
															pedidoService, blockUI){
	var service = pedidoService;
	$scope.listItemsDetalle = [];
	$scope.totalDetallePedido = 0;
	$scope.pedido = model.id;

	service.getDetalleRegistro(model.id).then(
		function (data){
			$scope.listItemsDetalle = data.data

			$scope.listItemsDetalle.forEach(function (item){
				$scope.totalDetallePedido = parseFloat($scope.totalDetallePedido) + parseFloat(item.subTotal);
			})
		}
	)

    $scope.cancel = function($event){
    	$event.preventDefault();
		$event.stopPropagation();

    	$modalInstance.dismiss('cancel');
    }

})