alquitrackApp.controller('cuentaCorrienteController', function($scope, $window, $location,
											    cuentaCorrienteService,ShareData, blockUI, Notification,
											    $modal){

	// Servicios relacionados
	var service = cuentaCorrienteService;
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

	$scope.getCuentasCorrientes = function(){

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

	$scope.getCuentasCorrientes();

	// Funciones para la pantalla principal del Pedido

	$scope.hacerPago = function(item){

		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl:'views/modals/abonoCuentaCorriente.html',
			controller: 'abonoCuentaCorrienteController',
			size: 'md',
			resolve: {
				model: function(){
					return item;
				},
				objInfo: function(){
					return info
				}
			}
		});

		modalInstance.result.then(function (response){
			if(response.type == true){
				Notification.success(response.message);
				$scope.getCuentasCorrientes();
			}else{
				Notification.error(response.message);
			}
		})

	}

	$scope.verMovimiento = function(item){
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl:'verCuentaCorrienteMovimiento.html',
			controller: 'movimientosCuentaCorrienteController',
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

alquitrackApp.controller('movimientosCuentaCorrienteController', function ($scope, $modalInstance, model, objInfo,
															cuentaCorrienteService, blockUI){

	var service = cuentaCorrienteService;
	$scope.listItemsDetalle = [];
	$scope.totalDetallePedido = 0;
	$scope.pedido = model.Factura.Pai.correlativosFacturas[0].serie + '-' + model.Factura.correlativo;
	$scope.serieFactura = model.Factura.Pai.correlativosFacturas[0].serie;

	service.getMovimientosCaja(model.FacturaId).then(
		function (data){
			$scope.listItemsDetalle = data.data
			$scope.listItemsDetalle.forEach(function (item){
				$scope.totalDetallePedido = parseFloat($scope.totalDetallePedido) + parseFloat(item.monto);
			})
		}
	)

    $scope.cancel = function($event){
    	$event.preventDefault();
		$event.stopPropagation();

    	$modalInstance.dismiss('cancel');
    }

})

alquitrackApp.controller('abonoCuentaCorrienteController', function ($scope, $modalInstance, model, objInfo,
															cuentaCorrienteService, tipoOperacionService,
															tipoPagoService, blockUI){

	var service = cuentaCorrienteService;
	var operaciones = tipoOperacionService;
	var pagos = tipoPagoService;
	$scope.item = model;

	$scope.tipoOperacionId = "";
	$scope.tipoPagoId = "";
	$scope.numeroCheque = "";
	$scope.fechaCheque = "";
	$scope.montoPagado = "";

	$scope.listOperaciones = [];
	$scope.listPagos = [];
	
	operaciones.getRegistrosAbono().then(
		function (data){
			$scope.listOperaciones = data.data
		}
	)

	pagos.getRegistros().then(
		function (data){
			$scope.listPagos = data.data
		}
	)

	$scope.dateClientServer = function(dt){
		var dtt = dt.split('-');
		var newf = new Date(dtt[2] + '-' + dtt[1] + '-' + dtt[0]);
		return moment(newf).format('YYYY-MM-DD');
	}

	$scope.crearAbono = function(){
		$scope.formError = "";

		if(!$scope.tipoOperacionId){
			$scope.formError = "Indique si el pago es de Abono o Pago Total";
			return false;
		}

		if(!$scope.tipoPagoId){
			$scope.formError = "Indique el Tipo de pago: Cheque o Efectivo";
			return false;
		}

		if($scope.tipoPagoId == 1){
			if(!$scope.montoPagado){
				$scope.formError = "Ingrese el monto que el cliente ha Cancelado";
				return false;
			}
		}else if($scope.tipoPagoId == 2){
			if(!$scope.numeroCheque || !$scope.fechaCheque || !$scope.montoPagado){
				$scope.formError = "Ingrese los campos correspondientes al Cheque";
				return false;
			}
		}

		if($scope.tipoOperacionId == 4){
			if($scope.montoPagado < model.saldoFactura){
				$scope.formError = "Si es Pago Total, el monto ingresado no debe ser menor al Saldo de la Factura";
				return false;
			}
		}

		var cajaObj = {
			monto: $scope.montoPagado,
			numeroCheque: $scope.numeroCheque,
			fechaCobroCheque: $scope.dateClientServer($scope.fechaCheque),
			tipoOperacionId: $scope.tipoOperacionId,
			tipoPagoId: $scope.tipoPagoId,
			ClienteId: model.Cliente.id,
			FacturaId: model.Factura.id
			correlativo: parseInt(model.Factura.correlativo),
			cliente: model.Cliente.nombre + ' ' + model.Cliente.apellido,
			serie: model.Factura.Pai.correlativosFacturas[0].serie
		}

		service.postAbonoCaja(cajaObj).then(
			function (data){
				$modalInstance.close(data);							
			}
		)
	}

	$scope.cancel = function($event){
    	$event.preventDefault();
		$event.stopPropagation();

    	$modalInstance.dismiss('cancel');
    }

})

