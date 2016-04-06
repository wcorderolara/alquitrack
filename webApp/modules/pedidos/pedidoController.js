alquitrackApp.controller('pedidoController', function($scope, $window, $location,
											    pedidoService,empleadoService, clienteService,
											    ShareData, blockUI, Notification,
											    $modal){

	// Servicios relacionados
	var service = pedidoService;
	var empService = empleadoService;
	var cliService = clienteService;
	

	var factory = ShareData;
	var info = factory.value;

	$scope.moneda = info.monedaPais;
	$scope.listItems = [];
	$scope.viewby = 10;
	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.itemsPerPage = $scope.viewby;
	$scope.maxSize = 5; //Number of pager buttons to show
	$scope.userRol = info.rol;
	$scope.totalPedido = 0;


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
	$scope.listItemsDetalle = [];


	$scope.setItemsPerPage = function(num) {
		$scope.itemsPerPage = num;
		$scope.currentPage = 1; //reset to first paghe
	}

	$scope.getTractores = function(){

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

	$scope.getTractores();

	// Funciones para la pantalla principal del Pedido

	clienteService.getRegistrosBySede(info.paisId).then(		
		function (data){
			$scope.listGeneralClientes = data.data;
			var items = data.data;
			for(item in items){
				$scope.listClientes.push(items[item].id + "-" +items[item].nombre+ " " + items[item].apellido);
			}
		}
	)

	$scope.getInfoCliente = function(clienteSelected){
		var _item = clienteSelected.split('-')[0];		
		var _idx = $scope.listGeneralClientes.map(function (e) {return e.id}).indexOf(parseInt(_item));
		var _info = $scope.listGeneralClientes[_idx];

		$scope.infoCliente ={
			id: _info.id,
			NitCliente: _info.numeroTributacion,
			nombreCliente: _info.nombre + " " + _info.apellido,
			direccionCliente: _info.direccion
		}
	}

	$scope.crearPedido = function(){
		var params = {
			observaciones: null,
			adelanto: null,
			fechaReservacion: moment(new Date()).format('YYYY-MM-DD'),
			ClienteId: $scope.infoCliente.id,
			SedeId: info.SedeId,
			estadoPedidoId: 1,
			EmpleadoId: info.empleado,
			status: 1,
			detalleReserva: JSON.stringify($scope.listItemsDetalle)
		}

		service.postRegistro(params).then(
			function (response){
				if(response.type){
					Notification.success(response.message);
					setTimeout(function(){
						$window.location = '#/app/ver/pedidos'
					}, 1250);
				}else{
					Notification.error(response.message);
				}
			}
		)
	}

	$scope.agregarDetallePedido = function(){
		var _model = {
			tractorId: "",
			nombre: "",
			horometro: "",
			fechaDespacho: "",
			fechaRegreso: "",
			tipoAlquilerId: "",
			tipoAlquiler:"",
			horasAlquiler: "",
			subTotal: ""
		}

		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl:'views/modals/catalogoTractores.html',
			controller: 'catalogoTractoresPedidoController',
			size: 'lg',
			resolve: {
				model: function(){
					return _model;
				},
				objInfo: function(){
					return info
				}
			}
		});

		modalInstance.result.then(function (objResponse){

			objResponse.forEach(function (item){
				$scope.listItemsDetalle.push(item);
				$scope.totalPedido = parseFloat($scope.totalPedido) + parseFloat(item.subTotal);
			})
		})
	}

})

alquitrackApp.controller('deleteTractorController', function($scope, $modalInstance, model, pedidoService){
	var service = pedidoService;
	$scope.registro = model;

	$scope.deleteRegistro = function(){
		service.deleteRegistro($scope.registro).then(
			function (response){
				$modalInstance.close(response);
			}
		)
	}

	$scope.cancel = function(){
    	$modalInstance.dismiss('cancel');
    }
})

alquitrackApp.controller('catalogoTractoresPedidoController', function ($scope, $modalInstance, model, objInfo,
															pedidoService, paisService, sedeService, tipoAlquilerService,
															tractorService,blockUI){
	var service = pedidoService;
	var paisService = paisService;
	var sedeService = sedeService;
	var tractorService = tractorService;
	var alquilerService = tipoAlquilerService;
	var info = objInfo;
	$scope.classSelected = "";

	$scope.listItems = [];
	$scope.listTipoAlquiler = [];

	$scope.listTractoresSeleccionados = [];	

	// traer informacion de tractores
	tractorService.getRegistrosBySede(info.SedeId).then(
		function (data){
			blockUI.start();
			var items = data.data;
			for(idx in items){
				var newItem = {
					id: items[idx].id,
					nombre: items[idx].nombre,
					imagen: items[idx].imagen,					
					descripcion: items[idx].descripcion,
					modelo: items[idx].modelo,
					capacidadPeso: items[idx].capacidadPeso,
					tipoEquipo: {descripcion: items[idx].tipoEquipo.descripcion},
					fechaDespacho: "",
					fechaRegreso: "",
					tipoAlquilerId: "",
					tipoAlquiler: "",
					totalAlquilerTractor: "",
					totalHorasAlquilado: 0,
					selected: false,
					formError: "",
					horometro: items[idx].horometro,
					classSelected: ""
				};

				$scope.listItems.push(newItem);
			}

			blockUI.stop();
			//$scope.listItems = data.data;
		}
	)

	$scope.getTipoAlquilerByTractor = function(item){
		alquilerService.getRegistrosByTractor(item).then(
			function (data){
				$scope.listTipoAlquiler = data.data;
			}
		)
	}

	// formulario para el detalle

	$scope.seleccionarTractor = function(item){
		item.selected = true;
		$scope.getTipoAlquilerByTractor(item.id);
	}
	
	$scope.cancelTractorpedido = function(item){
		item.selected = false;
	}

	$scope.openFechaDespacho = function($event, item){
		$event.preventDefault();
		$event.stopPropagation();

		item.fechaD.opened = true;
	}

	$scope.openFechaRegreso = function($event, item){
		$event.preventDefault();
		$event.stopPropagation();

		item.fechaR.opened = true;
	}

	$scope.restaFechas = function(dt1, dt2){
		var aFecha1 = dt1.split('-'); 
		var aFecha2 = dt2.split('-'); 
		var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]); 
		var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]); 
		var dif = fFecha2 - fFecha1;
		var dias = Math.floor(dif / (1000 * 60 * 60 * 24)); 
		return dias;
	}

	$scope.calcularSubTotal = function(item, alquilerId){
		var _idx = $scope.listTipoAlquiler.map(function (e) {return e.id}).indexOf(alquilerId);
		var _element = $scope.listTipoAlquiler[_idx];
		item.tipoAlquiler = _element.descripcion;

		if(_element.descripcion == 'diario'){
			var dif = $scope.restaFechas(item.fechaDespacho, item.fechaRegreso);						
			// item.totalAlquilerTractor = 0;
			item.totalHorasAlquilado = dif * parseInt(_element.horasMinimas);
			item.totalAlquilerTractor = dif * ( parseFloat(parseInt(_element.horasMinimas) * parseFloat(_element.precioEquipos[0].precio)) );
		}else{
			// item.totalAlquilerTractor = 0;
			item.totalHorasAlquilado = parseInt(_element.horasMinimas);
			item.totalAlquilerTractor = parseFloat(_element.precioEquipos[0].precio);
		}
	}

	$scope.dateClienteToServer = function(fecha){
		var of = fecha.split('-');
		var newDate = of[1] + '-' + of[0] + '-' + of[2];

		return String(new Date(newDate));
	}

	$scope.agregarTractorPedido = function(item){		
		if(!item.fechaDespacho || !item.fechaRegreso || !item.tipoAlquilerId){
			item.formError = "todos los campos son requeridos";
			return false;
		}

		var _newItem = {
			id: item.id, //es el Id del Tractor
			nombre: item.nombre,
			horometro: item.horometro,
			fechaDespacho: $scope.dateClienteToServer(item.fechaDespacho),
			fechaRegreso: $scope.dateClienteToServer(item.fechaRegreso),
			tipoAlquilerId: item.tipoAlquilerId,
			tipoAlquiler: item.tipoAlquiler,
			horasAlquiler: item.totalHorasAlquilado,
			subTotal: item.totalAlquilerTractor
		}
		$scope.listTractoresSeleccionados.push(_newItem);
		item.classSelected = "tractor-selected";
	}


	$scope.postRegistro = function(){
		$scope.formError = "";
		// console.log($scope.listTractoresSeleccionados);
		
		if($scope.listTractoresSeleccionados.length > 0){
			$modalInstance.close($scope.listTractoresSeleccionados);
		}else{
			$scope.formError = "Debe seleccionar al menos un tractor..."
			return false;
		}
		
	}

    $scope.cancel = function($event){
    	$event.preventDefault();
		$event.stopPropagation();

    	$modalInstance.dismiss('cancel');
    }

})