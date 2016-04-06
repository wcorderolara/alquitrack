alquitrackApp.controller('verFacturasController', function($scope, $window, $location,
											    facturaService,ShareData, blockUI, Notification,
											    $modal){

	// Servicios relacionados
	var service = facturaService;
	var factory = ShareData;
	var info = factory.value;

	// no se borran
	$scope.viewby = 10;
	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.itemsPerPage = $scope.viewby;
	$scope.maxSize = 5;
	// no se borran

	$scope.listItems = [];


	$scope.setItemsPerPage = function(num) {
		$scope.itemsPerPage = num;
		$scope.currentPage = 1; //reset to first paghe
	}

	$scope.getFacturas = function(){

		if(info.rol == 'Administrador'){	
			service.getRegistros().then(
				function (data){
					$scope.listItems = data.data;
					$scope.totalItems = $scope.listItems.length;
				}
			)
		}else{
			service.getRegistrosBySede(info.SedeId).then(
				function (data){
					$scope.listItems = data.data;
					$scope.totalItems = $scope.listItems.length;
				}
			)
		}
	}		

	$scope.getFacturas();

	// Funciones para la pantalla principal del Pedido

	$scope.verDetallePedido = function(item){

		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl:'verFacturasDetalle.html',
			controller: 'detalleFacturaController',
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

alquitrackApp.controller('detalleFacturaController', function ($scope, $modalInstance, model, objInfo,
															facturaService, blockUI){

	var service = facturaService;
	$scope.listItemsDetalle = [];
	$scope.totalDetallePedido = 0;
	$scope.pedido = model.Pai.correlativosFacturas[0].serie + '-' +model.id;

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