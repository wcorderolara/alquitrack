alquitrackApp.controller('facturaController', function($scope, $window, $location,
											    facturaService,pedidoService
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
				getPedidosActivos();
				// setTimeout(function(){
				// 	$window.location.reload();
				// }, 1250);
			}else{
				Notification.error(response.message);
			}
		})
	}

})

alquitrackApp.controller('facturarPedidoController', function ($scope, $modalInstance, model, objInfo,
															facturaService, pedidoService, tipoOperacionService, 
															tipoPagoService,blockUI){
	var service = facturaService;
	var pedidos = pedidoService;
	var operaciones = tipoOperacionService;
	var pagos = tipoPagoService;
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
		var aFecha1 = dt1.split('/'); 
		var aFecha2 = dt2.split('/'); 
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

	$scope.agregarTractorPedido = function(item){		
		if(!item.fechaDespacho || !item.fechaRegreso || !item.tipoAlquilerId){
			item.formError = "todos los campos son requeridos";
			return false;
		}
		var _newItem = {
			id: item.id, //es el Id del Tractor
			nombre: item.nombre,
			horometro: item.horometro,
			fechaDespacho: moment(item.fechaDespacho).format("L"),
			fechaRegreso: moment(item.fechaRegreso).format("L"),
			tipoAlquilerId: item.tipoAlquilerId,
			tipoAlquiler: item.tipoAlquiler,
			horasAlquiler: item.totalHorasAlquilado,
			subTotal: item.totalAlquilerTractor
		}
		$scope.listTractoresSeleccionados.push(_newItem);
		item.classSelected = "tractor-selected";
	}


	$scope.facturarPedido = function(){
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