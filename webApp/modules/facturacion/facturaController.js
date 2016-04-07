alquitrackApp.controller('facturaController', function($scope, $window, $location,
											    facturaService,pedidoService,
											    ShareData, blockUI, Notification,
											    $modal){

	// Servicios relacionados
	var service = facturaService;
	var pedidos = pedidoService;	
	var factory = ShareData;
	var info = factory.value;

	// no se borran
	$scope.moneda = info.monedaPais;
	$scope.listItems = [];
	$scope.viewby = 10;
	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.itemsPerPage = $scope.viewby;
	$scope.maxSize = 5; //Number of pager buttons to show
	// no se borran

	$scope.userRol = info.rol;


	//Elementos del principal
	$scope.listGeneralClientes = [];
	$scope.listClientes = []
	$scope.infoCliente = {
		id: "",
		NitCliente: "",
		nombreCliente: "",
		direccionCliente: ""
	}

	// Elementos del Detalle Pedido
	$scope.listItems = [];


	$scope.setItemsPerPage = function(num) {
		$scope.itemsPerPage = num;
		$scope.currentPage = 1; //reset to first paghe
	}

	$scope.getPedidosActivos = function(){

		if(info.rol == 'Administrador'){	
			pedidos.getRegistros().then(
				function (data){
					$scope.listItems = data.data;
					$scope.totalItems = $scope.listItems.length;
				}
			)
		}else{
			pedidos.getRegistrosBySede(info.SedeId).then(
				function (data){
					$scope.listItems = data.data;
					$scope.totalItems = $scope.listItems.length;
				}
			)
		}
	}		

	$scope.getPedidosActivos();

	$scope.generarFactura = function(item){
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl:'views/modals/cajaFactura.html',
			controller: 'facturarPedidoController',
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

		modalInstance.result.then(function (response){
			if(response.type == true){
				Notification.success(response.message);
				$scope.getPedidosActivos();
			}else{
				Notification.error(response.message);
			}
		})
	}

})

alquitrackApp.controller('facturarPedidoController', function ($scope, $modalInstance, model, objInfo,
															facturaService, pedidoService, tipoOperacionService, 
															tipoPagoService,blockUI){
	// console.log(model);
	$scope.dateServerClient = function(dt){
		var _do = dt.substring(0,10);
		var dtt = _do.split('-');
		var newf = new Date(dtt[1] + '-' + dtt[2] + '-' + dtt[0]);
		return moment(newf).format('DD-MM-YYYY');
	}
	var service = facturaService;
	var pedidos = pedidoService;
	var operaciones = tipoOperacionService;
	var pagos = tipoPagoService;
	var info = objInfo;
	$scope.moneda = info.monedaPais;

	$scope.fechaReservacion = $scope.dateServerClient(model.fechaReservacion);
	$scope.tieneCredito = model.Cliente.tieneCredito == true ? 1 : 0;
	$scope.item = model;

	$scope.tipoOperacionId = "";
	$scope.tipoPagoId = "";
	$scope.numeroCheque = "";
	$scope.fechaCheque = "";
	$scope.montoPagado = "";

	$scope.listItemsDetalle = [];
	$scope.listOperaciones = [];
	$scope.listPagos = [];

	pedidos.getDetalleRegistro($scope.item.id).then(
		function (data){
			$scope.listItemsDetalle = data.data;
		}
	)

	operaciones.getRegistrosFactura().then(
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
		return moment(newf).format('YYY-MM-DD');
	}

	$scope.fechaVencimientoCredito = function(dt, diasCredito){
		var dtt = dt.split('-');
		var mth = parseInt(dtt[1]) - 1;
		var mmtf = moment([dtt[0],mth,dtt[2]]).add(diasCredito,'d');
		return moment(mmtf._d).format('YYYY-MM-DD');

	}

	$scope.facturarPedido = function(){
		$scope.formError = "";
		$scope.detalleFactura = [];

		if(!$scope.tipoOperacionId){
			$scope.formError = "Indique si el pago es de Contado o a Credito";
			return false;
		}

		if($scope.tipoOperacionId == 1){
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
				if(!$scope.numeroCheque || !$scope.fechaCheque || !scope.montoPagado){
					$scope.formError = "Ingrese los campos correspondientes al Cheque";
					return false;
				}
			}

		}

		$scope.listItemsDetalle.forEach(function (item){
			var objDetalle = {
				fechaSale: item.fechaSale,
				fechaRegresa: item.fechaRegresa,
				subTotal: item.subTotal,
				TractorId: item.Tractor.id,
				tipoAlquilerId: item.tipoAlquiler.id
			}
			$scope.detalleFactura.push(objDetalle);
		})

		$scope.objFactura = {
			PedidoId: model.id,
			monto: model.reservaDetalles[0].Total,
			aceptoContrato: 1,
			fechaCreacion: moment(new Date()).format('YYYY-MM-DD'),
			status: $scope.tipoOperacionId == 2 ? 1 : 0,
			ClienteId: model.ClienteId,
			PaiId: info.paisId,
			EmpleadoId: info.empleado,
			tipoPagoId: $scope.tipoOperacionId == 2 ? 1 : $scope.tipoPagoId,
			UsuarioId: info.usuarioId,
			SedeId: info.SedeId,
			tipoOperacionId: $scope.tipoOperacionId,
			detalleFactura: JSON.stringify($scope.detalleFactura)
		}

		service.postRegistro($scope.objFactura).then(
			function (data){
				if(data.type == true){
					if($scope.tipoOperacionId == 1){
						var cajaObj = {
							monto: $scope.montoPagado,
							numeroCheque: $scope.numeroCheque,
							fechaCobroCheque: $scope.dateClientServer($scope.fechaCheque),
							tipoOperacionId: $scope.tipoOperacionId,
							tipoPagoId: $scope.tipoPagoId,
							ClienteId: model.Cliente.id,
							FacturaId: parseInt(data.factura.id),
							correlativo: parseInt(data.factura.correlativo),
							cliente: model.Cliente.nombre + ' ' + model.Cliente.apellido
						}

						service.postCaja(cajaObj).then(
							function (data){
								$modalInstance.close(data);							
							}
						)
					}else if($scope.tipoOperacionId == 2){
						var ccObj = {
							saldoFactura: model.reservaDetalles[0].Total,
							diasCredito: model.Cliente.tipoCredito.diasCredito,
							fechaVencimiento: $scope.fechaVencimientoCredito(moment(new Date()).format('YYYY-MM-DD'), model.Cliente.tipoCredito.diasCredito),
							ClienteId: model.ClienteId,
							FacturaId: parseInt(data.factura)
						}

						service.postCuentaCorriente(ccObj).then(
							function (data){
								$modalInstance.close(data);
							}
						)
					}
				}
			}
		)
	}

    $scope.cancel = function($event){
    	$event.preventDefault();
		$event.stopPropagation();

    	$modalInstance.dismiss('cancel');
    }

})