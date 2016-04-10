alquitrackApp.controller('clienteController', function($scope, $window, $location,
											    clienteService, ShareData, blockUI, Notification,
											    $modal){

	var service = clienteService;
	var factory = ShareData;
	var info = factory.value;

	$scope.listItems = [];
	$scope.viewby = 10;
	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.itemsPerPage = $scope.viewby;
	$scope.maxSize = 5; //Number of pager buttons to show
	$scope.userRol = info.rol;

	$scope.setItemsPerPage = function(num) {
		$scope.itemsPerPage = num;
		$scope.currentPage = 1; //reset to first paghe
	}

	$scope.getClientes = function(){

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

	$scope.getClientes();

	$scope.openModal = function(action, model){
		var _model = model || {};
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'views/modals/crudRegistroCliente.html',
			controller: 'crudClienteController',
			size: 'lg',
			resolve: {
				action: function(){
					return action;
				},
				model: function(){
					return _model;
				},
				objInfo: function(){
					return info
				}
			}
		});

		modalInstance.result.then(function (data){
			if(data.type){
				Notification.success(data.message);
				$scope.getClientes();
			}else{
				Notification.error(data.message);
				return false;
			}
		})
	}

	$scope.delete = function(item){
		var _model = item;
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'views/modals/deleteRegistro.html',
			controller: 'deleteClienteController',
			size: 'md',
			resolve: {				
				model: function(){
					return _model;
				}
			}
		});

		modalInstance.result.then(function (data){
			if(data.type){
				Notification.success(data.message);
				$scope.getClientes();
			}else{
				Notification.error(data.message);
				return false;
			}
		})
	}

})

alquitrackApp.controller('deleteClienteController', function($scope, $modalInstance, model, clienteService){
	var service = clienteService;
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

alquitrackApp.controller('crudClienteController', function ($scope, $modalInstance, action, model, objInfo,
															clienteService, paisService, sedeService){
	var service = clienteService;
	var paisService = paisService;
	var sedeService = sedeService;
	var info = objInfo;

	$scope.setPais = function(){
		var result = "";

		if(info.rol == 'Administrador'){
			result = "";
		}else{
			result = info.paisId
		}

		return result;
	}	

	$scope.listClientes = [];
	$scope.listTipoCliente = [];
	$scope.listTipoCredito = [];
	$scope.listPaises = [];
	$scope.listSedes = [];

	$scope.state = action;
	$scope.title = $scope.state == 'nuevo' ? 'Crear nuevo Registro' : 'Editar Registro';
	$scope.textButton = $scope.state == 'nuevo' ? 'Agregar' : 'Editar';

	$scope.nombre = model.nombre || "";
	$scope.apellido = model.apellido || "";
	$scope.numeroTributacion = model.numeroTributacion  || "";
	$scope.numeroIdentificacion = model.numeroIdentificacion || "";
	$scope.direccion = model.direccion || "";
	$scope.telefono = model.telefono || "";
	$scope.email = model.email || "";
	$scope.website = model.website || "";
	$scope.tieneCredito = model.tieneCredito || 0;
	$scope.tipoClienteId = $scope.state == 'nuevo' ? "" : model.tipoClienteId;
	$scope.PaiId = $scope.state == 'nuevo' ? $scope.setPais : model.PaiId;
	$scope.tipoCreditoId = $scope.state == 'nuevo' ? "" : model.tipoCreditoId;
	$scope.SedeId = $scope.state == 'nuevo' ? "" : model.SedeId;

	paisService.getPaises().then(
		function (data){
			$scope.listPaises = data.data;
		}
	)

	$scope.getSedesPais = function(PaiId){
		sedeService.getRegistroByPais(PaiId).then(
			function (data){
				$scope.listSedes = data.data;
			}
		)
	}

	service.getTiposCliente().then(
		function (data){
			$scope.listTipoCliente = data.data;
		}
	)

	service.getTiposCredito().then(
		function (data){
			$scope.listTipoCredito = data.data;
		}
	)

    $scope.postRegistro = function(){
    	$scope.formError = "";

    	if(!$scope.nombre || !$scope.apellido || !$scope.numeroTributacion || !$scope.direccion || 
    	   !$scope.telefono || !$scope.tieneCredito || !$scope.tipoClienteId || !$scope.PaiId ||
    	   !$scope.tipoCreditoId || !$scope.SedeId){
    		$scope.formError = "Todos los campos son obligatorios";
    		return false;
    	}

    	if($scope.state == 'nuevo'){

    		var params = {
    			nombre: $scope.nombre,
				apellido: $scope.apellido,
				numeroTributacion: $scope.numeroTributacion,
				numeroIdentificacion: $scope.numeroIdentificacion,
				direccion: $scope.direccion,
				telefono: $scope.telefono,
				email: $scope.email,
				website: $scope.website,
				tieneCredito : $scope.tieneCredito,
				tipoClienteId: $scope.tipoClienteId,
				PaiId: $scope.PaiId,
				tipoCreditoId: $scope.tipoCreditoId,
				SedeId: $scope.SedeId
    		}
    		service.postRegistro(params).then(
    			function (response){
    				$modalInstance.close(response);
    			}
    		)
    	}else{
    		var params = {
    			id: model.id,
    			nombre: $scope.nombre,
				apellido: $scope.apellido,
				numeroTributacion: $scope.numeroTributacion,
				numeroIdentificacion: $scope.numeroIdentificacion,
				direccion: $scope.direccion,
				telefono: $scope.telefono,
				email: $scope.email,
				website: $scope.website,
				tieneCredito : $scope.tieneCredito,
				tipoClienteId: $scope.tipoClienteId,
				PaiId: $scope.PaiId,
				tipoCreditoId: $scope.tipoCreditoId,
				SedeId: $scope.SedeId
    		}
    		service.postRegistro(params).then(
    			function (response){
    				$modalInstance.close(response);
    			}
    		)
    	}
    }

    $scope.cancel = function($event){
    	$event.preventDefault();
		$event.stopPropagation();

    	$modalInstance.dismiss('cancel');
    }

})