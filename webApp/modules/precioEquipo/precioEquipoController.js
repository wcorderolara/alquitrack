alquitrackApp.controller('precioEquipoController', function($scope, $window, $location,
											    precioEquipoService, ShareData, blockUI, Notification,
											    $modal){

	var service = precioEquipoService;
	
	$scope.listItems = [];
	$scope.viewby = 10;
	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.itemsPerPage = $scope.viewby;
	$scope.maxSize = 5; //Number of pager buttons to show

	$scope.setItemsPerPage = function(num) {
		$scope.itemsPerPage = num;
		$scope.currentPage = 1; //reset to first paghe
	}

	$scope.getPreciosEquipo = function(){
		service.getRegistros().then(
			function (data){
				console.log('precio Equipo');
				console.log(data);
				$scope.listItems = data.data;
				$scope.totalItems = $scope.listItems.length;
			}
		)
	}	

	$scope.getPreciosEquipo();

	$scope.openModal = function(action, model){
		var _model = model || {};
		var modalInstance = $modal.open({
			windowClass: '',
			templateUrl: 'crudForm.html',
			controller: 'crudPrecioEquipoController',
			size: 'md',
			resolve: {
				action: function(){
					return action;
				},
				model: function(){
					return _model;
				}
			}
		});

		modalInstance.result.then(function (data){
			if(data.type){
				Notification.success(data.message);
				$scope.getPreciosEquipo();
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
			controller: 'deletePrecioEquipoController',
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
				$scope.getPreciosEquipo();
			}else{
				Notification.error(data.message);
				return false;
			}
		})
	}

})

alquitrackApp.controller('deletePrecioEquipoController', function($scope, $modalInstance, model, precioEquipoService){
	var service = precioEquipoService;
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

alquitrackApp.controller('crudPrecioEquipoController', function ($scope, $modalInstance, action, model,
															precioEquipoService, paisService, tipoAlquilerService, 
															tipoEquipoService){
	var service = precioEquipoService;
	var paisService = paisService;
	var alquilerService = tipoAlquilerService;
	var equipoService = tipoEquipoService;

	$scope.listPaises = [];
	$scope.listAlquileres = [];
	$scope.listEquipos = [];

	$scope.state = action;
	$scope.title = $scope.state == 'nuevo' ? 'Crear nuevo Registro' : 'Editar Registro';
	$scope.textButton = $scope.state == 'nuevo' ? 'Agregar' : 'Editar';
	$scope.precio = model.precio || "";
	$scope.tipoEquipoId = $scope.state == 'nuevo' ? "" : model.tipoEquipoId;
	$scope.tipoAlquilerId = $scope.state == 'nuevo' ? "" : model.tipoAlquilerId;
	$scope.PaiId = $scope.state == 'nuevo' ? "" : model.PaiId;

	paisService.getPaises().then(
		function (data){
			$scope.listPaises = data.data;
		}
	)

	alquilerService.getRegistros().then(
		function (data){
			$scope.listAlquileres = data.data;
		}
	)

	equipoService.getRegistros().then(
		function (data){
			$scope.listEquipos = data.data;
		}
	)

    $scope.postRegistro = function(){
    	$scope.formError = "";

    	if(!$scope.precio || !$scope.tipoEquipoId || !$scope.tipoAlquilerId || !$scope.PaiId){
    		$scope.formError = "Todos los campos son obligatorios";
    		return false;
    	}

    	if($scope.state == 'nuevo'){
    		var params = {
    			precio: $scope.precio,
    			tipoEquipoId: $scope.tipoEquipoId,
    			tipoAlquilerId: $scope.tipoAlquilerId,
    			PaiId: $scope.PaiId
    		}
    		service.postRegistro(params).then(
    			function (response){
    				$modalInstance.close(response);
    			}
    		)
    	}else{
    		var params = {
    			id: model.id,
    			precio: $scope.precio,
    			tipoEquipoId: $scope.tipoEquipoId,
    			tipoAlquilerId: $scope.tipoAlquilerId,
    			PaiId: $scope.PaiId
    		}
    		service.putRegistro(params).then(
    			function (response){
    				$modalInstance.close(response);
    			}
    		)
    	}
    }

    $scope.cancel = function(){
    	$modalInstance.dismiss('cancel');
    }

})