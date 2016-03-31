alquitrackApp.controller('tractorController', function($scope, $window, $location,
											    tractorService, ShareData, blockUI, Notification,
											    $modal){

	var service = tractorService;
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

	$scope.openModal = function(action, model){
		var _model = model || {};
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'crudForm.html',
			controller: 'crudTractorController',
			size: 'md',
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
				$scope.getTractores();
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
			templateUrl: 'deleteRegistro.html',
			controller: 'deleteTractorController',
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
				$scope.getTractores();
			}else{
				Notification.error(data.message);
				return false;
			}
		})
	}

})

alquitrackApp.controller('deleteTractorController', function($scope, $modalInstance, model, tractorService){
	var service = tractorService;
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

alquitrackApp.controller('crudTractorController', function ($scope, $modalInstance, action, model, objInfo,
															tractorService, paisService, sedeService){
	var service = tractorService;
	var paisService = paisService;
	var sedeService = sedeService;
	var info = objInfo;

	$scope.listTipoEquipo = [];
	$scope.listPaises = [];
	$scope.listSedes = [];
	$scope.listImagenes = [];

	$scope.state = action;
	$scope.title = $scope.state == 'nuevo' ? 'Crear nuevo Registro' : 'Editar Registro';
	$scope.textButton = $scope.state == 'nuevo' ? 'Agregar' : 'Editar';

	$scope.nombre = model.nombre || "";
	$scope.descripcion = model.descripcion || "";
	$scope.marca = model.marca  || "";
	$scope.modelo = model.modelo || "";
	$scope.anio = model.anio || "";
	$scope.fechaCompra = model.fechaCompra || "";
	$scope.imagen = model.imagen || "";
	
	$scope.estadoEquipoId = $scope.state == 'nuevo' ? 1 : model.estadoEquipoId;
	$scope.PaiId = $scope.state == 'nuevo' ? "" : model.PaiId;
	$scope.SedeId = $scope.state == 'nuevo' ? "" : model.SedeId;
	$scope.tipoEquipoId = $scope.state == 'nuevo' ? "" : model.tipoEquipoId;

	paisService.getPaises().then(
		function (data){
			$scope.listPaises = data.data;
		}
	)

	$scope.getSedesPais = function(PaiId){
		service.getRegistroByPais(paiId).then(
			function (data){
				$scope.listSedes = data.data;
			}
		)
	}

	service.getTiposEquipo().then(
		function (data){
			$scope.listTipoEquipo = data.data;
		}
	)

	$scope.uploadPic = function(file, errFiles) {
	    service.uploadImagen(file).then(
	    	function (data){
	    		$scope.listImagenes.push(data.data.data.url);
	    	}
	    )
    }

    $scope.postRegistro = function(){
    	$scope.formError = "";

    	if(!$scope.nombre || !$scope.apellido || !$scope.numeroTributacion || !$scope.direccion || 
    	   !$scope.telefono || !$scope.tieneCredito || !$scope.tipoClienteId || !$scope.PaiId ||
    	   !$scope.tipoCreditoId || !$scope.SedeId){
    		$scope.formError = "Todos los campos con asterisco son obligatorios";
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